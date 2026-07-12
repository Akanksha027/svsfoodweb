process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import fs from "fs";
import path from "path";
import https from "https";

const data = JSON.parse(fs.readFileSync("items.json", "utf8"));
const DEFAULT = "/images/hamburgerrr.png";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
}

function download(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) return resolve(true);
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
          console.log("FAIL", res.statusCode, path.basename(dest));
          return resolve(false);
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      })
      .on("error", (e) => {
        console.log("ERR", e.message);
        try {
          fs.unlinkSync(dest);
        } catch {}
        resolve(false);
      });
  });
}

const categoriesRaw = data.categories
  .filter((c) => c.is_active && !c.is_deleted && c.is_published !== false)
  .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

const itemsRaw = data.items.filter(
  (i) => !i.is_deleted && i.is_published !== false
);

// Group variation rows under parent id when present
const groups = new Map();
for (const item of itemsRaw) {
  const key = item.petpooja_parent_item_id || item.petpooja_item_id || item.id;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(item);
}

const catDir = path.join("public", "images", "menu", "categories");
const itemDir = path.join("public", "images", "menu");
fs.mkdirSync(catDir, { recursive: true });
fs.mkdirSync(itemDir, { recursive: true });

// Download category images
const catImages = {};
for (const cat of categoriesRaw) {
  if (!cat.image_url) continue;
  const ext = path.extname(new URL(cat.image_url).pathname) || ".png";
  const filename = `${cat.petpooja_category_id || cat.id}${ext}`;
  const dest = path.join(catDir, filename);
  const ok = await download(cat.image_url, dest);
  catImages[cat.id] = ok
    ? `/images/menu/categories/${filename}`
    : cat.image_url;
  process.stdout.write(ok ? "C" : "c");
}
console.log("");

// Build menu items (one card per group)
const builtItems = [];
for (const [, rows] of groups) {
  rows.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const primary =
    rows.find((r) => !r.variation_name) ||
    rows.slice().sort((a, b) => a.price - b.price)[0];

  const prices = rows.map((r) => Number(r.price)).filter((p) => p > 0);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const hasVariations = rows.some((r) => r.variation_name);

  let priceLabel = `₹${Math.round(min)}`;
  let priceNote = null;
  if (hasVariations && min !== max) {
    priceLabel = `from ₹${Math.round(min)}`;
    priceNote = rows
      .filter((r) => r.variation_name)
      .sort((a, b) => a.price - b.price)
      .map((r) => `${r.variation_name} ₹${Math.round(r.price)}`)
      .join(" · ");
  }

  // Prefer a clean display name without variation suffix
  let name = primary.name;
  if (hasVariations) {
    name = name
      .replace(/\s*\([^)]*(Size|Milk|Regular|Chilled|Oat)[^)]*\)\s*$/i, "")
      .trim();
  }

  const imageUrl =
    rows.find((r) => r.image_url)?.image_url ||
    primary.image_url ||
    "";

  const localId =
    primary.petpooja_parent_item_id ||
    primary.petpooja_item_id ||
    primary.id.replace(/[^a-zA-Z0-9_-]/g, "_");

  let localImage = DEFAULT;
  if (imageUrl) {
    const ext = path.extname(new URL(imageUrl).pathname) || ".jpg";
    const filename = `${localId}${ext}`;
    const dest = path.join(itemDir, filename);
    const ok = await download(imageUrl, dest);
    localImage = ok ? `/images/menu/${filename}` : imageUrl;
    process.stdout.write(ok ? "." : "x");
  }

  builtItems.push({
    id: String(localId),
    category_id: primary.category_id,
    name,
    description: primary.description || "",
    price: min,
    priceLabel,
    priceNote,
    image: localImage,
    remoteImage: imageUrl,
    hasRemoteImage: Boolean(imageUrl),
    isJain: Boolean(primary.is_jain),
    isDairyFree: /dairy free/i.test(name),
    isVeg: primary.is_veg !== false,
  });
}
console.log("");

const categories = categoriesRaw.map((c) => {
  const items = builtItems
    .filter((i) => i.category_id === c.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  // strip category_id from exported items
  const cleanItems = items.map(({ category_id, remoteImage, ...rest }) => rest);

  return {
    id: c.petpooja_category_id || c.id,
    name: c.name,
    slug: slugify(c.name),
    image: catImages[c.id] || null,
    items: cleanItems,
  };
}).filter((c) => c.items.length > 0);

const pick = (slug, re) =>
  categories.find((c) => c.slug === slug)?.items.find((i) => re.test(i.name))
    ?.image || DEFAULT;

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
  garlicSupreme: pick("garlic-bread", /Stuff Supreme|Stuffed Supreme/i),
  paneerWrap: pick("naan-rolls", /Paneer Wraproll|Paneer/i),
  about1: "/images/about-svs-1.webp",
  about2: "/images/about-svs-2.webp",
  about3: "/images/about-svs-3.webp",
  burgerH: "/images/burgerH.webp",
};

const restaurant = {
  name: data.store?.name || "SVS Food",
  address: data.store?.location || "",
  city: "SATNA",
  contact: "7869717041",
  currency: "₹",
  minOrder: "100",
  deliveryTime: "30 Minutes",
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
  isVeg?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
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
  `export const MENU_CATEGORIES: MenuCategory[] = ${JSON.stringify(categories, null, 2)};\n\n` +
  `export const FEATURED_IMAGES = ${JSON.stringify(featured, null, 2)} as const;\n\n` +
  `export const TOTAL_ITEMS = MENU_CATEGORIES.reduce((n, c) => n + c.items.length, 0);\n`;

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/menu.ts", body);

const total = categories.reduce((n, c) => n + c.items.length, 0);
const withImg = categories.reduce(
  (n, c) => n + c.items.filter((i) => i.hasRemoteImage).length,
  0
);
console.log(
  `Wrote menu.ts — ${categories.length} categories, ${total} items (${withImg} with images)`
);
categories.forEach((c) =>
  console.log(`  ${c.name}: ${c.items.length} items, catImg=${!!c.image}`)
);
