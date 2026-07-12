process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html,application/json,*/*",
          },
        },
        (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            return resolve(fetchText(res.headers.location));
          }
          let d = "";
          res.on("data", (c) => (d += c));
          res.on("end", () => resolve({ status: res.statusCode, body: d }));
        }
      )
      .on("error", reject);
  });
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
];

const all = [];
for (const url of pages) {
  try {
    const { status, body } = await fetchText(url);
    console.log(url, status, body.length);
    const imgs = [...body.matchAll(/https?:\/\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\\\s>]*)?/gi)].map(
      (m) => m[0]
    );
    const unique = [...new Set(imgs)];
    console.log("  images:", unique.length);
    unique.slice(0, 15).forEach((u) => console.log("   ", u));
    all.push({ url, images: unique, bodySnippet: body.slice(0, 500) });

    // Look for next data / __NEXT_DATA__ / product JSON
    const nextMatch = body.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (nextMatch) {
      fs.writeFileSync(
        path.join("scripts", `svs-${url.split("/").pop()}.json`),
        nextMatch[1]
      );
      console.log("  saved __NEXT_DATA__");
    }

    // Look for uengage / product image patterns in HTML
    const productBlocks = [
      ...body.matchAll(
        /(?:product|item)[^>]{0,200}?(https?:\/\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp))/gi
      ),
    ];
    console.log("  product-ish:", productBlocks.length);
  } catch (e) {
    console.log(url, e.message);
  }
}

fs.writeFileSync("scripts/svs-scrape-summary.json", JSON.stringify(all.map(({url, images}) => ({url, images})), null, 2));
