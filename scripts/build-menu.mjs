import fs from "fs";
import path from "path";

const data = JSON.parse(fs.readFileSync("24475.txt", "utf8"));

/** Single fallback for any item without a usable image in 24475 */
const DEFAULT_BURGER = "/images/hamburgerrr.png";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
}

function formatPrice(item) {
  const p = parseFloat(item.price);
  if (p > 0) {
    return { price: p, priceLabel: `₹${Math.round(p)}`, priceNote: null };
  }

  const vars = (item.variation || [])
    .filter((v) => v.active === "1")
    .sort((a, b) => +a.variationrank - +b.variationrank);

  if (!vars.length) {
    return { price: 0, priceLabel: "—", priceNote: null };
  }

  const prices = vars.map((v) => parseFloat(v.price));
  const min = Math.min(...prices);

  if (vars[0].groupname === "Size") {
    return {
      price: min,
      priceLabel: `from ₹${Math.round(min)}`,
      priceNote: vars
        .map(
          (v) =>
            `${v.name.replace(" Size", "")} ₹${Math.round(+v.price)}`
        )
        .join(" · "),
    };
  }

  const max = Math.max(...prices);
  const label =
    vars.length > 1 && min !== max
      ? `from ₹${Math.round(min)}`
      : `₹${Math.round(min)}`;

  return { price: min, priceLabel: label, priceNote: null };
}

const cats = data.categories
  .filter((c) => c.active === "1")
  .sort((a, b) => +a.categoryrank - +b.categoryrank);

let withRemote = 0;
let withDefault = 0;

const categories = cats.map((c) => {
  const slug = slugify(c.categoryname);

  const catItems = data.items
    .filter((i) => i.active === "1" && i.item_categoryid === c.categoryid)
    .sort((a, b) => +a.itemrank - +b.itemrank)
    .map((item) => {
      const { price, priceLabel, priceNote } = formatPrice(item);
      const remote = (item.item_image_url || "").trim();
      const hasRemote = remote.length > 0;

      if (hasRemote) withRemote++;
      else withDefault++;

      return {
        id: item.itemid,
        name: item.itemname,
        description: item.itemdescription || "",
        price,
        priceLabel,
        priceNote,
        // Prefer exact image from 24475; otherwise one shared burger
        image: hasRemote ? remote : DEFAULT_BURGER,
        hasRemoteImage: hasRemote,
        isJain: /jain/i.test(item.itemname),
        isDairyFree: /dairy free/i.test(item.itemname),
      };
    });

  return {
    id: c.categoryid,
    name: c.categoryname,
    slug,
    items: catItems,
  };
});

const featured = {
  paneerHerbinaro: "/images/1b(1).webp",
  maharaja: "/images/5b.webp",
  chilliLava: "/images/2b(1).webp",
  supreme: "/images/3b.webp",
  alooTikki: "/images/tikki.webp",
  allInOnePizza: "/images/cheeseimg.webp",
  margherita: "/images/cheeseimg.webp",
  dressingFries: "/images/fries.webp",
  periPeriFries: "/images/fries.webp",
  chocoLava: "/images/cheesyBurger.png",
  virginMojito: "/images/tomatoimg.webp",
  garlicSupreme: "/images/bun.webp",
  paneerWrap: "/images/burgerHands.png",
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
  deliveryTime:
    data.restaurants?.[0]?.details?.minimumdeliverytime || "30 Minutes",
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

/** Shared placeholder when an item has no image in the menu export */
export const DEFAULT_MENU_IMAGE = ${JSON.stringify(DEFAULT_BURGER)};

`;

const body =
  header +
  `export const RESTAURANT: RestaurantInfo = ${JSON.stringify(
    restaurant,
    null,
    2
  )};\n\n` +
  `export const MENU_CATEGORIES: MenuCategory[] = ${JSON.stringify(
    categories,
    null,
    2
  )};\n\n` +
  `export const FEATURED_IMAGES = ${JSON.stringify(
    featured,
    null,
    2
  )} as const;\n\n` +
  `export const TOTAL_ITEMS = MENU_CATEGORIES.reduce((n, c) => n + c.items.length, 0);\n`;

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync(path.join("src", "data", "menu.ts"), body);
console.log(
  `Wrote menu.ts — remote images: ${withRemote}, default burger: ${withDefault}`
);
