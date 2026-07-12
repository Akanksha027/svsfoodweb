export type MenuItem = {
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

export const RESTAURANT: RestaurantInfo = {
  "name": "SVS Food",
  "address": "Jeeva Jyoti Colony, Near Circuit House, Rewa Road, Satna Locality, Satna",
  "city": "SATNA",
  "contact": "7869717041",
  "currency": "₹",
  "minOrder": "100",
  "deliveryTime": "30 Minutes"
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    "id": "542961",
    "name": "BURGERS",
    "slug": "burgers",
    "image": "/images/menu/categories/542961.png",
    "items": [
      {
        "id": "1256647960",
        "name": "Aloo Tikki Burger",
        "description": "Crispy Aloo Patty With Svs Secret Sauce",
        "price": 57.15,
        "priceLabel": "₹57",
        "priceNote": null,
        "image": "/images/menu/1256647960.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1304877616",
        "name": "Chilli Avocado Burger",
        "description": "Creamy Avocado Spread With A Fiery Kick Layered Over A Juicy Patty For The Perfect Spicy Balance",
        "price": 133.34,
        "priceLabel": "₹133",
        "priceNote": null,
        "image": "/images/menu/1304877616.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235799472",
        "name": "Chilli Lava Burger",
        "description": "Flavoured A Slightly Spicier",
        "price": 95.25,
        "priceLabel": "₹95",
        "priceNote": null,
        "image": "/images/menu/1235799472.jpeg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1306854005",
        "name": "Jain Burger",
        "description": "A Classic Jain Burger With Raw Banana Patty & Sauces",
        "price": 85.72,
        "priceLabel": "₹86",
        "priceNote": null,
        "image": "/images/menu/1306854005.jpg",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1307418027",
        "name": "Jumbo Paneer Burger",
        "description": "Loaded With A Jumbo Thick Paneer Patty For The Ultimate Big Bite",
        "price": 133.34,
        "priceLabel": "₹133",
        "priceNote": null,
        "image": "/images/menu/1307418027.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235799476",
        "name": "Maharaja Burger",
        "description": "Crispy Aloo & Paneer Patty With Special Sauce",
        "price": 133.34,
        "priceLabel": "₹133",
        "priceNote": null,
        "image": "/images/menu/1235799476.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235799475",
        "name": "Paneer Burger",
        "description": "Crispy Paneer Patty With Tom Mayo Sauce",
        "price": 114.29,
        "priceLabel": "₹114",
        "priceNote": null,
        "image": "/images/menu/1235799475.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1304877615",
        "name": "Paneer Herbinaro Burger",
        "description": "A Flavour-Packed Paneer Patty Infused With Jalapeños, Onion, Tomato And Herby Seasoning From Within, Layered With A Bold Tangy-Spicy Sauce",
        "price": 152.39,
        "priceLabel": "₹152",
        "priceNote": null,
        "image": "/images/menu/1304877615.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235799471",
        "name": "Supreme Burger",
        "description": "Cheesy Burger With Blend Of Tom Mayo Sauce",
        "price": 85.72,
        "priceLabel": "₹86",
        "priceNote": null,
        "image": "/images/menu/1235799471.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1301351067",
        "name": "Vadapav Burger",
        "description": "Mumbai Special Vadapav With A Burger Twist",
        "price": 66.68,
        "priceLabel": "₹67",
        "priceNote": null,
        "image": "/images/menu/1301351067.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1306899678",
        "name": "Veg Burger ( Dairy Free )",
        "description": "Dairy Free Sauces With Potato Patty And Cashew Cheese Slice",
        "price": 66.68,
        "priceLabel": "₹67",
        "priceNote": null,
        "image": "/images/menu/1306899678.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": true,
        "isVeg": true
      }
    ]
  },
  {
    "id": "2430322",
    "name": "NAAN & ROLLS",
    "slug": "naan-rolls",
    "image": "/images/menu/categories/2430322.png",
    "items": [
      {
        "id": "1235799477",
        "name": "Chatpata Naan",
        "description": "Crunchy Naan Filled With Special Masala & Mexican Sauce",
        "price": 57.15,
        "priceLabel": "₹57",
        "priceNote": null,
        "image": "/images/menu/1235799477.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235799478",
        "name": "Cheese Chatpata Naan",
        "description": "Crunchy Naan Filled With Special Cheesy Masala & Mexican Sauce",
        "price": 76.2,
        "priceLabel": "₹76",
        "priceNote": null,
        "image": "/images/menu/1235799478.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1250936248",
        "name": "Crispy Wraproll",
        "description": "Filled With Aloo Masala & Veggies",
        "price": 76.2,
        "priceLabel": "₹76",
        "priceNote": null,
        "image": "/images/menu/1250936248.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1306854289",
        "name": "Jain Wraproll ( Without Onion & Garlic )",
        "description": "A Chatpata Jain Roll Packed With Flavor In Every Bite",
        "price": 114.29,
        "priceLabel": "₹114",
        "priceNote": null,
        "image": "/images/menu/1306854289.jpg",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1250936249",
        "name": "Paneer Wraproll",
        "description": "Filled With Paneer Masala & Veggies",
        "price": 95.25,
        "priceLabel": "₹95",
        "priceNote": null,
        "image": "/images/menu/1250936249.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      }
    ]
  },
  {
    "id": "542967",
    "name": "SIDES",
    "slug": "sides",
    "image": "/images/menu/categories/542967.png",
    "items": [
      {
        "id": "1307356506",
        "name": "Cheesy Rounders 8pc",
        "description": "Loaded With Cheese & Corn Goodness",
        "price": 114.29,
        "priceLabel": "₹114",
        "priceNote": null,
        "image": "/images/menu/1307356506.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1308406401",
        "name": "Chinny Pops",
        "description": "made with meshed potato crunchy coins marinade with chinese sauce",
        "price": 76.2,
        "priceLabel": "₹76",
        "priceNote": null,
        "image": "/images/menu/1308406401.jpeg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1279905805",
        "name": "Dressing Fries",
        "description": "Crispy Fries With Cheesy, Creamy Toppings",
        "price": 133.34,
        "priceLabel": "₹133",
        "priceNote": null,
        "image": "/images/menu/1279905805.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1306855185",
        "name": "Jain Spring Rolls ( Without Onion & Garlic )",
        "description": "Crunchy Jain Spring Rolls With A Delicious Vegetable Filling",
        "price": 114.29,
        "priceLabel": "₹114",
        "priceNote": null,
        "image": "/images/menu/1306855185.jpg",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235804992",
        "name": "Peri Peri Fries",
        "description": "Crispy Fries Assorted With Spicy Herbs",
        "price": 95.25,
        "priceLabel": "₹95",
        "priceNote": null,
        "image": "/images/menu/1235804992.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1306855349",
        "name": "Raw Banana Samosa 5pc ( Without Onion & Garlic )",
        "description": "Crispy Mini Samosas Filled With Flavourful Raw Banana & Green Peas",
        "price": 114.29,
        "priceLabel": "₹114",
        "priceNote": null,
        "image": "/images/menu/1306855349.png",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235804991",
        "name": "Salted Fries",
        "description": "Crispy Fries Assorted With Savoury Himalayan Salt",
        "price": 85.72,
        "priceLabel": "₹86",
        "priceNote": null,
        "image": "/images/menu/1235804991.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1306855051",
        "name": "Spring Rolls 5pc",
        "description": "Crispy Golden Spring Rolls Filled With Flavorful Vegetables",
        "price": 114.29,
        "priceLabel": "₹114",
        "priceNote": null,
        "image": "/images/menu/1306855051.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1306855052",
        "name": "Veggie Sticks 6pc",
        "description": "Golden-Fried Veggie Sticks With A Delicious Vegetable Filling",
        "price": 114.29,
        "priceLabel": "₹114",
        "priceNote": null,
        "image": "/images/menu/1306855052.png",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      }
    ]
  },
  {
    "id": "542962",
    "name": "PIZZA",
    "slug": "pizza",
    "image": "/images/menu/categories/542962.png",
    "items": [
      {
        "id": "1235803601",
        "name": "All In One Pizza",
        "description": "An Explosion Of Flavours Featuring Jalapenos Olives Paneer Veggies & Cheese",
        "price": 295.25,
        "priceLabel": "from ₹295",
        "priceNote": "Medium Size 21 Cm ₹295 · King Size 30 Cm ₹552",
        "image": "/images/menu/1235803601.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235803599",
        "name": "Golden Corn Pizza",
        "description": "A Savoury Blend Of Corn & Cheese",
        "price": 209.54,
        "priceLabel": "from ₹210",
        "priceNote": "Medium Size 21 Cm ₹210 · King Size 30 Cm ₹438",
        "image": "/images/menu/1235803599.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1248034877",
        "name": "Jain Pizza",
        "description": "A Mindful Option Without Onion & Garlic",
        "price": 266.68,
        "priceLabel": "from ₹267",
        "priceNote": "Medium Size 21 Cm ₹267 · King Size 30 Cm ₹467",
        "image": "/images/menu/1248034877.jpg",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235802964",
        "name": "Margherita Pizza",
        "description": "Classic Pizza With A Blanket Of Delicious Cheese",
        "price": 171.44,
        "priceLabel": "from ₹171",
        "priceNote": "Medium Size 21 Cm ₹171 · King Size 30 Cm ₹419",
        "image": "/images/menu/1235802964.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235803600",
        "name": "Pepe Paneer Pizza",
        "description": "Paneer Capsicum Onion Paprika & Cheese Unite In This Flavourful Pizza",
        "price": 266.68,
        "priceLabel": "from ₹267",
        "priceNote": "Medium Size 21 Cm ₹267 · King Size 30 Cm ₹486",
        "image": "/images/menu/1235803600.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235803598",
        "name": "Veggie Loaded Pizza",
        "description": "Bursting With Capsicum Onion Tomato & Cheese",
        "price": 200,
        "priceLabel": "from ₹200",
        "priceNote": "Medium Size 21 Cm ₹200 · King Size 30 Cm ₹438",
        "image": "/images/menu/1235803598.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      }
    ]
  },
  {
    "id": "542968",
    "name": "BEVERAGES",
    "slug": "beverages",
    "image": "/images/menu/categories/542968.png",
    "items": [
      {
        "id": "1301229748",
        "name": "Banarasi Paan Fusion",
        "description": "Creamy Shake Infused With The Rich Flavor Of Banarasi Paan",
        "price": 133.34,
        "priceLabel": "from ₹133",
        "priceNote": "Regular Milk ₹133 · Oat Milk ₹162",
        "image": "/images/menu/1301229748.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235804999",
        "name": "Cold Coffee Craze",
        "description": "Classic Symphony Of Rich Coffee & Creamy Goodness",
        "price": 133.34,
        "priceLabel": "from ₹133",
        "priceNote": "Regular Milk ₹133 · Oat Milk ₹162",
        "image": "/images/menu/1235804999.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235805000",
        "name": "Oreo Obsession",
        "description": "Velvety Smoothness Meets Crunchy Oreo",
        "price": 133.34,
        "priceLabel": "from ₹133",
        "priceNote": "Regular Milk ₹133 · Oat Milk ₹162",
        "image": "/images/menu/1235805000.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1246597169",
        "name": "Ras Malai Retreat",
        "description": "Beloved Indian Dessert With Richness Of Creamy Milk & Saffron",
        "price": 133.34,
        "priceLabel": "from ₹133",
        "priceNote": "Regular Milk ₹133 · Oat Milk ₹162",
        "image": "/images/menu/1246597169.png",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1281823413",
        "name": "Spicy Lemonade",
        "description": "A Refreshing Desi Drink With Tangy Lemon And A Spicy Kick",
        "price": 133.34,
        "priceLabel": "₹133",
        "priceNote": null,
        "image": "/images/menu/1281823413.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1272145652",
        "name": "Strawberry Sensation",
        "description": "Sip Into Strawberry Heaven With Our Delightful Milkshake",
        "price": 133.34,
        "priceLabel": "from ₹133",
        "priceNote": "Regular Milk ₹133 · Oat Milk ₹162",
        "image": "/images/menu/1272145652.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235804997",
        "name": "Virgin Mojito",
        "description": "A Refreshing Soda Mocktail Made With Fresh Mint, Zesty Lime, And A Sparkling Twist",
        "price": 133.34,
        "priceLabel": "₹133",
        "priceNote": null,
        "image": "/images/menu/1235804997.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235806177",
        "name": "Water Bottle",
        "description": "1 Litre Mineral Water Bottle",
        "price": 19.05,
        "priceLabel": "₹19",
        "priceNote": null,
        "image": "/images/menu/1235806177.png",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      }
    ]
  },
  {
    "id": "542966",
    "name": "GARLIC BREAD",
    "slug": "garlic-bread",
    "image": "/images/menu/categories/542966.png",
    "items": [
      {
        "id": "1235807475",
        "name": "Loaf Cheese Garlic Bread",
        "description": "A Classic Treat Filled Solely With Delicious Cheese",
        "price": 171.44,
        "priceLabel": "₹171",
        "priceNote": null,
        "image": "/images/menu/1235807475.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235807472",
        "name": "Stuff Cheese Garlic Bread",
        "description": "A Delightful Blend Of Gooey Cheese Stuffed Within",
        "price": 142.87,
        "priceLabel": "₹143",
        "priceNote": null,
        "image": "/images/menu/1235807472.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235807473",
        "name": "Stuff Corn Garlic Bread",
        "description": "Cheese & Corn Combined For A Flavourful Twist",
        "price": 171.44,
        "priceLabel": "₹171",
        "priceNote": null,
        "image": "/images/menu/1235807473.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235807474",
        "name": "Stuff Supreme Garlic Bread",
        "description": "Packed With Jalapenos Olives Corn & A Little Veggies With Cheese",
        "price": 190.49,
        "priceLabel": "₹190",
        "priceNote": null,
        "image": "/images/menu/1235807474.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      }
    ]
  },
  {
    "id": "1262830",
    "name": "TASTE MAKER DIPS",
    "slug": "taste-maker-dips",
    "image": "/images/menu/categories/1262830.png",
    "items": [
      {
        "id": "1311128245",
        "name": "Booster Slice ( Made Of Cashew Paste )",
        "description": "Made Of Rich Cashew Paste, Enriched With Vitamin B12, Lactose-Free, And 100% Vegan",
        "price": 28.58,
        "priceLabel": "₹29",
        "priceNote": null,
        "image": "/images/menu/1311128245.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235817225",
        "name": "Burger Sause",
        "description": "Tangy, Creamy Burger Sauce – A Perfect Dip",
        "price": 19.05,
        "priceLabel": "₹19",
        "priceNote": null,
        "image": "/images/menu/1235817225.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235879171",
        "name": "Cheese Slice",
        "description": "An Extra Cheese Slice Upgrade On Your Burger",
        "price": 19.05,
        "priceLabel": "₹19",
        "priceNote": null,
        "image": "/images/menu/1235879171.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235817221",
        "name": "Chilli Garlic Dip",
        "description": "Bold, Spicy Garlic Punch",
        "price": 19.05,
        "priceLabel": "₹19",
        "priceNote": null,
        "image": "/images/menu/1235817221.png",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235817223",
        "name": "Liquid Cheese",
        "description": "Rich, Melty Cheese Delight",
        "price": 19.05,
        "priceLabel": "₹19",
        "priceNote": null,
        "image": "/images/menu/1235817223.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1235817224",
        "name": "Mayo Dip",
        "description": "Smooth, Creamy Classic Dip",
        "price": 19.05,
        "priceLabel": "₹19",
        "priceNote": null,
        "image": "/images/menu/1235817224.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      }
    ]
  },
  {
    "id": "543664",
    "name": "DESSERTS",
    "slug": "desserts",
    "image": "/images/menu/categories/543664.png",
    "items": [
      {
        "id": "1307750415",
        "name": "Blueberry Malai Cake",
        "description": "Cake Assorted With Malai & A Layer Of Sweet Blueberry Pulp  ( Also Dairy Free )",
        "price": 56.2,
        "priceLabel": "₹56",
        "priceNote": null,
        "image": "/images/menu/1307750415.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "8185399",
        "name": "Choco Lava Cake",
        "description": "Dessert With A Hot Liquid Ch ocolate Filled Inside",
        "price": 95.25,
        "priceLabel": "₹95",
        "priceNote": null,
        "image": "/images/menu/8185399.jpeg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1305321573",
        "name": "Mango Malai Cake",
        "description": "Cake Assorted With Malai & A Layer Of Mango Pulp ( Also Dairy Free )",
        "price": 56.2,
        "priceLabel": "₹56",
        "priceNote": null,
        "image": "/images/menu/1305321573.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1260897616",
        "name": "Strawberry Malai Cake",
        "description": "Cake Assorted With Malai & Garnished With A Layer Of Strawberry Pulp ( Also Dairy Free )",
        "price": 56.2,
        "priceLabel": "₹56",
        "priceNote": null,
        "image": "/images/menu/1260897616.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      }
    ]
  },
  {
    "id": "5354101",
    "name": "PARTY COMBOS",
    "slug": "party-combos",
    "image": "/images/menu/categories/5354101.png",
    "items": [
      {
        "id": "1284452012",
        "name": "Naan + Beverage",
        "description": "",
        "price": 160.97,
        "priceLabel": "₹161",
        "priceNote": null,
        "image": "/images/menu/1284452012.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      },
      {
        "id": "1284452011",
        "name": "Wraproll + Beverage",
        "description": "",
        "price": 170.49,
        "priceLabel": "₹170",
        "priceNote": null,
        "image": "/images/menu/1284452011.jpg",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false,
        "isVeg": true
      }
    ]
  }
];

export const FEATURED_IMAGES = {
  "paneerHerbinaro": "/images/menu/1304877615.jpg",
  "maharaja": "/images/menu/1235799476.jpg",
  "chilliLava": "/images/menu/1235799472.jpeg",
  "supreme": "/images/menu/1235799471.jpg",
  "alooTikki": "/images/menu/1256647960.jpg",
  "allInOnePizza": "/images/menu/1235803601.jpg",
  "margherita": "/images/menu/1235802964.jpg",
  "dressingFries": "/images/menu/1279905805.jpg",
  "periPeriFries": "/images/menu/1235804992.jpg",
  "chocoLava": "/images/menu/8185399.jpeg",
  "virginMojito": "/images/menu/1235804997.jpg",
  "garlicSupreme": "/images/menu/1235807474.jpg",
  "paneerWrap": "/images/menu/1250936249.jpg",
  "about1": "/images/about-svs-1.webp",
  "about2": "/images/about-svs-2.webp",
  "about3": "/images/about-svs-3.webp",
  "burgerH": "/images/burgerH.webp"
} as const;

export const TOTAL_ITEMS = MENU_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
