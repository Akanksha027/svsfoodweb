process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import https from "https";
import fs from "fs";
import path from "path";

const catalog = new Map(
  JSON.parse(fs.readFileSync("scripts/svs-image-catalog.json")).map(([a, s]) => [
    a.replace(/&amp;/g, "&").trim(),
    s,
  ])
);
const data = JSON.parse(fs.readFileSync("24475.txt", "utf8"));
const DEFAULT = "/images/hamburgerrr.png";
const dir = path.join("public", "images", "menu");
fs.mkdirSync(dir, { recursive: true });

const ALIASES = {
  "Stuff Corn Garlic Bread": ["Stuffed Cheese & Corn"],
  "Stuff Supreme Garlic Bread": ["Stuffed Supreme"],
  "Stuff Cheese Garlic Bread": ["Stuffed Cheese"],
  "Loaf Cheese Garlic Bread": ["Loaf Cheese"],
  "Jain Cashew Cheese Burger ( Without Onion & Garlic )": ["Dairy Free Burger"],
  "Jain Cheese Burger ( Without Onion & Garlic )": [
    "Jain Burger ( Without Onion & Garlic )",
    "Jain Burger",
  ],
  "Veg Burger ( Dairy Free )": ["Dairy Free Burger"],
  "Crispy Wraproll": ["Crispy Veg"],
  "Chatpata Naan": ["Chatpata Tikki", "Chatpata Cheese"],
  "Cheese Chatpata Naan": ["Chatpata Cheese"],
  "Paneer Wraproll": ["Paneer Patola"],
  "Mango Malai Cake": ["Mango Melt"],
  "Strawberry Malai Cake": ["Strawberry Swirl"],
  "Strawberry Malai Cake ( Dairy Free )": ["Strawberry Swirl"],
  "Mango Malai Cake ( Dairy Free )": ["Mango Melt"],
  "Peri Peri Fries": ["Peri Peri"],
  "Salted Fries": ["Salted"],
  "Dressing Fries": ["Dressing"],
  "Jain Peri Peri Fries ( Without Onion & Garlic )": [
    "Jain Peri Peri ( Without Onion & Garlic )",
  ],
  "Chilli Garlic Dip": ["Chilli Garlic"],
  "Mayo Dip": ["Mayo"],
  "Burger Sause": ["Burger Sause", "Burger Sauce"],
  "Margherita Pizza": ["Margherita"],
  "Veggie Loaded Pizza": ["Veggie Loaded"],
  "Golden Corn Pizza": ["Golden Corn"],
  "Pepe Paneer Pizza": ["Pepe Paneer"],
  "All In One Pizza": ["All In One"],
  "Paneer Burger": ["Paneer"],
  "Maharaja Burger": ["Maharaja"],
  "Supreme Burger": ["Supreme"],
  "Aloo Tikki Burger": ["Aloo Tikki"],
  "Vadapav Burger": ["Vadapav"],
  "Jumbo Paneer Burger": ["Jumbo Paneer"],
  "Fusion Paneer Burger": ["Fusion Paneer"],
  "Chilli Avocado Burger": ["Chilli Avocado"],
  "Chilli Lava Burger": ["Chilli Lava"],
  "Paneer Herbinaro Burger": ["Paneer Herbinaro"],
  "Jain Maharaja Burger ( Without Onion & Garlic )": ["Maharaja"],
  "Jain Paneer Burger ( Without Onion & Garlic )": ["Paneer"],
};

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function score(a, b) {
  a = norm(a);
  b = norm(b);
  if (!a || !b) return 0;
  if (a === b) return 100;
  if (a.includes(b) || b.includes(a)) return 90;
  const drop = new Set([
    "burger",
    "the",
    "with",
    "and",
    "without",
    "onion",
    "garlic",
    "dairy",
    "free",
    "pc",
    "special",
  ]);
  const aw = a.split(" ").filter((w) => !drop.has(w) && w.length > 2);
  const bw = b.split(" ").filter((w) => !drop.has(w) && w.length > 2);
  if (!aw.length || !bw.length) return 0;
  const hit = aw.filter((w) => bw.some((x) => x.includes(w) || w.includes(x)));
  return (hit.length / Math.max(aw.length, bw.length)) * 75;
}

function download(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1500) return resolve(true);
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          try {
            fs.unlinkSync(dest);
          } catch {}
          return resolve(download(new URL(res.headers.location, url).href, dest));
        }
        if (res.statusCode !== 200) {
          file.close();
          try {
            fs.unlinkSync(dest);
          } catch {}
          const small = url.replace("/crops/600/", "/crops/160/");
          if (small !== url) return resolve(download(small, dest));
          return resolve(false);
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      })
      .on("error", () => {
        try {
          fs.unlinkSync(dest);
        } catch {}
        resolve(false);
      });
  });
}

const entries = [...catalog.entries()];
const mapping = {};

for (const item of data.items.filter((i) => i.active === "1")) {
  let best = null;
  let bestScore = 0;
  const aliasList = ALIASES[item.itemname] || [];

  for (const al of aliasList) {
    if (catalog.has(al)) {
      best = { alt: al, src: catalog.get(al) };
      bestScore = 999;
      break;
    }
  }

  if (bestScore < 999) {
    for (const [alt, src] of entries) {
      let s = score(item.itemname, alt);
      for (const al of aliasList) s = Math.max(s, score(al, alt) + 5);
      if (s > bestScore) {
        bestScore = s;
        best = { alt, src };
      }
    }
  }

  if (best && bestScore >= 40) {
    mapping[item.itemid] = { ...best, score: bestScore, name: item.itemname };
  }
}

console.log("Matched", Object.keys(mapping).length);

for (const [id, m] of Object.entries(mapping)) {
  const dest = path.join(dir, `${id}.webp`);
  const url = m.src.replace(/\/crops\/\d+\//, "/crops/600/");
  const ok = await download(url, dest);
  m.local = ok ? `/images/menu/${id}.webp` : null;
  process.stdout.write(ok ? "." : "x");
}
console.log("");

fs.writeFileSync("scripts/svs-image-mapping.json", JSON.stringify(mapping, null, 2));

function slugify(n) {
  return n
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
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
    priceLabel:
      vars.length > 1 && min !== max
        ? `from ₹${Math.round(min)}`
        : `₹${Math.round(min)}`,
    priceNote: null,
  };
}

let withImg = 0;
let withDefault = 0;
const cats = data.categories
  .filter((c) => c.active === "1")
  .sort((a, b) => +a.categoryrank - +b.categoryrank)
  .map((c) => {
    const items = data.items
      .filter((i) => i.active === "1" && i.item_categoryid === c.categoryid)
      .sort((a, b) => +a.itemrank - +b.itemrank)
      .map((item) => {
        const { price, priceLabel, priceNote } = formatPrice(item);
        const mapped = mapping[item.itemid];
        const image = mapped?.local || DEFAULT;
        if (image === DEFAULT) withDefault++;
        else withImg++;
        return {
          id: item.itemid,
          name: item.itemname,
          description: item.itemdescription || "",
          price,
          priceLabel,
          priceNote,
          image,
          hasRemoteImage: image !== DEFAULT,
          isJain: /jain/i.test(item.itemname),
          isDairyFree: /dairy free/i.test(item.itemname),
        };
      });
    return {
      id: c.categoryid,
      name: c.categoryname,
      slug: slugify(c.categoryname),
      items,
    };
  });

const pick = (slug, re) =>
  cats.find((c) => c.slug === slug)?.items.find((i) => re.test(i.name))?.image ||
  DEFAULT;

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
  name: data.restaurants[0].details.restaurantname,
  address: data.restaurants[0].details.address.trim(),
  city: data.restaurants[0].details.city,
  contact: data.restaurants[0].details.contact,
  currency: data.restaurants[0].details.currency_html,
  minOrder: data.restaurants[0].details.minimumorderamount,
  deliveryTime: data.restaurants[0].details.minimumdeliverytime,
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
export const DEFAULT_MENU_IMAGE = "/images/hamburgerrr.png";

`;

const body =
  header +
  `export const RESTAURANT: RestaurantInfo = ${JSON.stringify(restaurant, null, 2)};\n\n` +
  `export const MENU_CATEGORIES: MenuCategory[] = ${JSON.stringify(cats, null, 2)};\n\n` +
  `export const FEATURED_IMAGES = ${JSON.stringify(featured, null, 2)} as const;\n\n` +
  `export const TOTAL_ITEMS = MENU_CATEGORIES.reduce((n, c) => n + c.items.length, 0);\n`;

fs.writeFileSync("src/data/menu.ts", body);
console.log(`real ${withImg}, default ${withDefault}`);
const miss = data.items.filter(
  (i) => i.active === "1" && !(mapping[i.itemid] && mapping[i.itemid].local)
);
console.log("Still default:");
miss.forEach((i) => console.log("-", i.itemname));
