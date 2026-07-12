process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import https from "https";
import fs from "fs";
import path from "path";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml",
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return resolve(fetchText(new URL(res.headers.location, url).href));
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () =>
            resolve({
              status: res.statusCode,
              body: Buffer.concat(chunks).toString("utf8"),
            })
          );
        }
      )
      .on("error", reject);
  });
}

function download(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1500) return resolve(true);
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          try { fs.unlinkSync(dest); } catch {}
          return resolve(download(new URL(res.headers.location, url).href, dest));
        }
        if (res.statusCode !== 200) {
          file.close();
          try { fs.unlinkSync(dest); } catch {}
          const small = url.replace("/crops/600/", "/crops/160/");
          if (small !== url) return resolve(download(small, dest));
          console.log("FAIL", res.statusCode, path.basename(dest));
          return resolve(false);
        }
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(true); });
      })
      .on("error", () => {
        try { fs.unlinkSync(dest); } catch {}
        resolve(false);
      });
  });
}

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreMatch(menuName, imgAlt) {
  const a = norm(menuName);
  const b = norm(imgAlt);
  if (!a || !b) return 0;
  if (a === b) return 100;
  if (a.includes(b) || b.includes(a)) return 85;

  const drop = new Set([
    "burger", "the", "with", "and", "without", "onion", "garlic",
    "dairy", "free", "pc", "size", "special",
  ]);
  const aw = a.split(" ").filter((w) => !drop.has(w) && w.length > 2);
  const bw = b.split(" ").filter((w) => !drop.has(w) && w.length > 2);
  if (!aw.length || !bw.length) return 0;
  const hit = aw.filter((w) => bw.some((x) => x.includes(w) || w.includes(x)));
  return (hit.length / Math.max(aw.length, bw.length)) * 75;
}

const pages = [
  "https://svsfood.com/products/burgers",
  "https://svsfood.com/products/sides",
  "https://svsfood.com/products/pizza",
  "https://svsfood.com/products/beverages",
  "https://svsfood.com/products/desserts",
  "https://svsfood.com/products/garlic-bread",
  "https://svsfood.com/products/naan-wraps",
  "https://svsfood.com/products/taste-maker-dips",
  "https://svsfood.com/products/party-combos",
];

const catalog = new Map(); // alt -> src

for (const url of pages) {
  console.log("Fetching", url);
  const { status, body } = await fetchText(url);
  console.log(" ", status, "len", body.length);

  // Match <img ... alt="..." ... src="cdn.uengage..."> in any attribute order
  const imgTags = [...body.matchAll(/<img\b[^>]*>/gi)];
  for (const [tag] of imgTags) {
    const alt = (tag.match(/\balt=["']([^"']*)["']/i) || [])[1] || "";
    const src =
      (tag.match(/\bsrc=["']([^"']+)["']/i) || [])[1] ||
      (tag.match(/\bdata-src=["']([^"']+)["']/i) || [])[1] ||
      "";
    if (
      alt &&
      src.includes("cdn.uengage.io") &&
      !src.includes("brand_logo")
    ) {
      catalog.set(alt.trim(), src.replace(/&amp;/g, "&"));
    }
  }

  // Also catch lazy-loaded JSON-ish patterns
  const pairs = [
    ...body.matchAll(
      /alt=["']([^"']+)["'][^>]*?(?:src|data-src)=["'](https:\/\/cdn\.uengage\.io[^"']+)["']/gi
    ),
    ...body.matchAll(
      /(?:src|data-src)=["'](https:\/\/cdn\.uengage\.io[^"']+)["'][^>]*?alt=["']([^"']+)["']/gi
    ),
  ];
  for (const m of pairs) {
    if (m.length === 3) {
      if (m[1].startsWith("http")) catalog.set(m[2].trim(), m[1]);
      else catalog.set(m[1].trim(), m[2]);
    }
  }
}

console.log("Catalog size:", catalog.size);
fs.writeFileSync(
  "scripts/svs-image-catalog.json",
  JSON.stringify([...catalog.entries()], null, 2)
);

if (catalog.size === 0) {
  console.error("No images found in HTML — site may be client-rendered only.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync("24475.txt", "utf8"));
const dir = path.join("public", "images", "menu");
fs.mkdirSync(dir, { recursive: true });
const DEFAULT_BURGER = "/images/hamburgerrr.png";
const entries = [...catalog.entries()];
const items = data.items.filter((i) => i.active === "1");
const mapping = {};

for (const item of items) {
  let best = null;
  let bestScore = 0;
  for (const [alt, src] of entries) {
    const s = scoreMatch(item.itemname, alt);
    if (s > bestScore) {
      bestScore = s;
      best = { alt, src };
    }
  }
  if (best && bestScore >= 40) {
    mapping[item.itemid] = { ...best, score: bestScore, name: item.itemname };
  }
}

console.log(`Matched ${Object.keys(mapping).length}/${items.length}`);

for (const [id, m] of Object.entries(mapping)) {
  const dest = path.join(dir, `${id}.webp`);
  const url = m.src.replace(/\/crops\/\d+\//, "/crops/600/");
  const ok = await download(url, dest);
  m.local = ok ? `/images/menu/${id}.webp` : null;
  process.stdout.write(ok ? "." : "x");
}
console.log("");

fs.writeFileSync("scripts/svs-image-mapping.json", JSON.stringify(mapping, null, 2));

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
}

function formatPrice(item) {
  const p = parseFloat(item.price);
  if (p > 0) return { price: p, priceLabel: `₹${Math.round(p)}`, priceNote: null };
  const vars = (item.variation || [])
    .filter((v) => v.active === "1")
    .sort((a, b) => +a.variationrank - +b.variationrank);
  if (!vars.length) return { price: 0, priceLabel: "—", priceNote: null };
  const prices = vars.map((v) => parseFloat(v.price));
  const min = Math.min(...prices);
  if (vars[0].groupname === "Size") {
    return {
      price: min,
      priceLabel: `from ₹${Math.round(min)}`,
      priceNote: vars
        .map((v) => `${v.name.replace(" Size", "")} ₹${Math.round(+v.price)}`)
        .join(" · "),
    };
  }
  const max = Math.max(...prices);
  return {
    price: min,
    priceLabel: vars.length > 1 && min !== max ? `from ₹${Math.round(min)}` : `₹${Math.round(min)}`,
    priceNote: null,
  };
}

const cats = data.categories
  .filter((c) => c.active === "1")
  .sort((a, b) => +a.categoryrank - +b.categoryrank);

let withImg = 0;
let withDefault = 0;

const categories = cats.map((c) => {
  const slug = slugify(c.categoryname);
  const catItems = data.items
    .filter((i) => i.active === "1" && i.item_categoryid === c.categoryid)
    .sort((a, b) => +a.itemrank - +b.itemrank)
    .map((item) => {
      const { price, priceLabel, priceNote } = formatPrice(item);
      const mapped = mapping[item.itemid];
      const image = mapped?.local || DEFAULT_BURGER;
      if (image === DEFAULT_BURGER) withDefault++;
      else withImg++;
      return {
        id: item.itemid,
        name: item.itemname,
        description: item.itemdescription || "",
        price,
        priceLabel,
        priceNote,
        image,
        hasRemoteImage: image !== DEFAULT_BURGER,
        isJain: /jain/i.test(item.itemname),
        isDairyFree: /dairy free/i.test(item.itemname),
      };
    });
  return { id: c.categoryid, name: c.categoryname, slug, items: catItems };
});

const pick = (slug, re) =>
  categories.find((c) => c.slug === slug)?.items.find((i) => re.test(i.name))?.image ||
  DEFAULT_BURGER;

const featured = {
  paneerHerbinaro: pick("burgers", /Herbinaro/i),
  maharaja: pick("burgers", /^Maharaja Burger$/),
  chilliLava: pick("burgers", /Chilli Lava/i),
  supreme: pick("burgers", /^Supreme Burger$/),
  alooTikki: pick("burgers", /Aloo Tikki/i),
  allInOnePizza: pick("pizza", /All In One/i),
  margherita: pick("pizza", /Margherita/i),
  dressingFries: pick("sides", /Dressing Fries/i),
  periPeriFries: pick("sides", /^Peri Peri Fries$/),
  chocoLava: pick("desserts", /Choco Lava/i),
  virginMojito: pick("beverages", /Virgin Mojito/i),
  garlicSupreme: pick("garlic-bread", /Stuff Supreme/i),
  paneerWrap: pick("naan-rolls", /Paneer Wraproll/i),
  about1: "/images/about-svs-1.webp",
  about2: "/images/about-svs-2.webp",
  about3: "/images/about-svs-3.webp",
  burgerH: "/images/burgerH.webp",
};

const restaurant = {
  name: data.restaurants?.[0]?.details?.restaurantname || "SVS Food",
  address: (data.restaurants?.[0]?.details?.address || "").trim(),
  city: data.restaurants?.[0]?.details?.city || "SATNA",
  contact: data.restaurants?.[0]?.details?.contact || "",
  currency: data.restaurants?.[0]?.details?.currency_html || "₹",
  minOrder: data.restaurants?.[0]?.details?.minimumorderamount || "100",
  deliveryTime: data.restaurants?.[0]?.details?.minimumdeliverytime || "30 Minutes",
};

const header = `export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  priceNote: string | null;
  image: string;
  hasRemoteImage: boolean;
  isJain: boolean;
  isDairyFree: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  slug: string;
  items: MenuItem[];
};

export type RestaurantInfo = {
  name: string;
  address: string;
  city: string;
  contact: string;
  currency: string;
  minOrder: string;
  deliveryTime: string;
};

/** Shared placeholder when an item has no real product photo */
export const DEFAULT_MENU_IMAGE = ${JSON.stringify(DEFAULT_BURGER)};

`;

const body =
  header +
  `export const RESTAURANT: RestaurantInfo = ${JSON.stringify(restaurant, null, 2)};\n\n` +
  `export const MENU_CATEGORIES: MenuCategory[] = ${JSON.stringify(categories, null, 2)};\n\n` +
  `export const FEATURED_IMAGES = ${JSON.stringify(featured, null, 2)} as const;\n\n` +
  `export const TOTAL_ITEMS = MENU_CATEGORIES.reduce((n, c) => n + c.items.length, 0);\n`;

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/menu.ts", body);
console.log(`Wrote menu.ts — real images: ${withImg}, default: ${withDefault}`);
