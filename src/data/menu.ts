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
    "items": [
      {
        "id": "1304877615",
        "name": "Paneer Herbinaro Burger",
        "description": "A Flavour-Packed Paneer Patty Infused With Jalapeños, Onion, Tomato And Herby Seasoning From Within, Layered With A Bold Tangy-Spicy Sauce",
        "price": 160,
        "priceLabel": "₹160",
        "priceNote": null,
        "image": "/images/menu/1304877615.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306854136",
        "name": "Jain Maharaja Burger ( Without Onion & Garlic )",
        "description": "",
        "price": 160,
        "priceLabel": "₹160",
        "priceNote": null,
        "image": "/images/menu/1306854136.webp",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false
      },
      {
        "id": "1307418027",
        "name": "Jumbo Paneer Burger",
        "description": "Loaded With A Jumbo Thick Paneer Patty For The Ultimate Big Bite",
        "price": 140,
        "priceLabel": "₹140",
        "priceNote": null,
        "image": "/images/menu/1307418027.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1304782937",
        "name": "Fusion Paneer Burger",
        "description": "Spicy Tangy Fusion With A Crispy Patty Stuffed With Mashed Paneer & Potatoes",
        "price": 140,
        "priceLabel": "₹140",
        "priceNote": null,
        "image": "/images/menu/1304782937.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1304877616",
        "name": "Chilli Avocado Burger",
        "description": "Creamy Avocado Spread With A Fiery Kick Layered Over A Juicy Patty For The Perfect Spicy Balance",
        "price": 140,
        "priceLabel": "₹140",
        "priceNote": null,
        "image": "/images/menu/1304877616.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306855300",
        "name": "Jain Cashew Cheese Burger ( Without Onion & Garlic )",
        "description": "",
        "price": 140,
        "priceLabel": "₹140",
        "priceNote": null,
        "image": "/images/menu/1306855300.webp",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false
      },
      {
        "id": "1235799476",
        "name": "Maharaja Burger",
        "description": "Crispy Aloo & Paneer Patty With Special Sauce",
        "price": 140,
        "priceLabel": "₹140",
        "priceNote": null,
        "image": "/images/menu/1235799476.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306854134",
        "name": "Jain Paneer Burger ( Without Onion & Garlic )",
        "description": "",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1306854134.webp",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false
      },
      {
        "id": "1306854133",
        "name": "Jain Cheese Burger ( Without Onion & Garlic )",
        "description": "",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1306854133.webp",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false
      },
      {
        "id": "1235799475",
        "name": "Paneer Burger",
        "description": "Crispy Paneer Patty With Tom Mayo Sauce",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1235799475.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306899678",
        "name": "Veg Burger ( Dairy Free )",
        "description": "",
        "price": 100,
        "priceLabel": "₹100",
        "priceNote": null,
        "image": "/images/menu/1306899678.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": true
      },
      {
        "id": "1235799472",
        "name": "Chilli Lava Burger",
        "description": "Flavoured A Slightly Spicier",
        "price": 100,
        "priceLabel": "₹100",
        "priceNote": null,
        "image": "/images/menu/1235799472.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235799471",
        "name": "Supreme Burger",
        "description": "Cheesy Burger With Blend Of Tom Mayo Sauce",
        "price": 90,
        "priceLabel": "₹90",
        "priceNote": null,
        "image": "/images/menu/1235799471.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306854005",
        "name": "Jain Burger",
        "description": "",
        "price": 90,
        "priceLabel": "₹90",
        "priceNote": null,
        "image": "/images/menu/1306854005.webp",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false
      },
      {
        "id": "1301351067",
        "name": "Vadapav Burger",
        "description": "Mumbai Special Vadapav With A Burger Twist",
        "price": 70,
        "priceLabel": "₹70",
        "priceNote": null,
        "image": "/images/menu/1301351067.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1256647960",
        "name": "Aloo Tikki Burger",
        "description": "Crispy Aloo Patty With Svs Secret Sauce",
        "price": 60,
        "priceLabel": "₹60",
        "priceNote": null,
        "image": "/images/menu/1256647960.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      }
    ]
  },
  {
    "id": "2430322",
    "name": "NAAN & ROLLS",
    "slug": "naan-rolls",
    "items": [
      {
        "id": "1306854289",
        "name": "Jain Wraproll ( Without Onion & Garlic )",
        "description": "A Chatpata Jain Roll Packed With Flavor In Every Bite",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1306854289.webp",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false
      },
      {
        "id": "1250936249",
        "name": "Paneer Wraproll",
        "description": "Filled With Paneer Masala & Veggies",
        "price": 100,
        "priceLabel": "₹100",
        "priceNote": null,
        "image": "/images/menu/1250936249.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1250936248",
        "name": "Crispy Wraproll",
        "description": "Filled With Aloo Masala & Veggies",
        "price": 80,
        "priceLabel": "₹80",
        "priceNote": null,
        "image": "/images/menu/1250936248.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235799478",
        "name": "Cheese Chatpata Naan",
        "description": "Crunchy Naan Filled With Special Cheesy Masala & Mexican Sauce",
        "price": 80,
        "priceLabel": "₹80",
        "priceNote": null,
        "image": "/images/menu/1235799478.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235799477",
        "name": "Chatpata Naan",
        "description": "Crunchy Naan Filled With Special Masala & Mexican Sauce",
        "price": 60,
        "priceLabel": "₹60",
        "priceNote": null,
        "image": "/images/menu/1235799477.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      }
    ]
  },
  {
    "id": "542967",
    "name": "SIDES",
    "slug": "sides",
    "items": [
      {
        "id": "1279905805",
        "name": "Dressing Fries",
        "description": "Crispy Fries With Cheesy, Creamy Toppings",
        "price": 140,
        "priceLabel": "₹140",
        "priceNote": null,
        "image": "/images/menu/1279905805.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306855051",
        "name": "Spring Rolls 5pc",
        "description": "",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1306855051.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306855052",
        "name": "Veggie Sticks 6pc",
        "description": "",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1306855052.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306855053",
        "name": "Noodles Samosa 5pc",
        "description": "",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/hamburgerrr.png",
        "hasRemoteImage": false,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306855185",
        "name": "Jain Spring Rolls ( Without Onion & Garlic )",
        "description": "",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1306855185.webp",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false
      },
      {
        "id": "1306855279",
        "name": "Jain Peri Peri Fries ( Without Onion & Garlic )",
        "description": "",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1306855279.webp",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false
      },
      {
        "id": "1306855349",
        "name": "Raw Banana Samosa 5pc ( Without Onion & Garlic )",
        "description": "",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1306855349.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1307356506",
        "name": "Cheesy Rounders 8pc",
        "description": "Loaded With Cheese & Corn Goodness",
        "price": 120,
        "priceLabel": "₹120",
        "priceNote": null,
        "image": "/images/menu/1307356506.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235804992",
        "name": "Peri Peri Fries",
        "description": "Crispy Fries Assorted With Spicy Herbs",
        "price": 100,
        "priceLabel": "₹100",
        "priceNote": null,
        "image": "/images/menu/1235804992.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235804991",
        "name": "Salted Fries",
        "description": "Crispy Fries Assorted With Savoury Himalayan Salt",
        "price": 90,
        "priceLabel": "₹90",
        "priceNote": null,
        "image": "/images/menu/1235804991.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      }
    ]
  },
  {
    "id": "542962",
    "name": "PIZZA",
    "slug": "pizza",
    "items": [
      {
        "id": "1248034877",
        "name": "Jain Pizza",
        "description": "A Mindful Option Without Onion & Garlic",
        "price": 280,
        "priceLabel": "from ₹280",
        "priceNote": "Medium 8\" ₹280 · King 12\" ₹490",
        "image": "/images/menu/1248034877.webp",
        "hasRemoteImage": true,
        "isJain": true,
        "isDairyFree": false
      },
      {
        "id": "1235802964",
        "name": "Margherita Pizza",
        "description": "Classic Pizza With A Blanket Of Delicious Cheese",
        "price": 180,
        "priceLabel": "from ₹180",
        "priceNote": "Medium 8\" ₹180 · King 12\" ₹440",
        "image": "/images/menu/1235802964.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235803598",
        "name": "Veggie Loaded Pizza",
        "description": "Bursting With Capsicum Onion Tomato & Cheese",
        "price": 210,
        "priceLabel": "from ₹210",
        "priceNote": "Medium 8\" ₹210 · King 12\" ₹460",
        "image": "/images/menu/1235803598.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235803599",
        "name": "Golden Corn Pizza",
        "description": "A Savoury Blend Of Corn & Cheese",
        "price": 220,
        "priceLabel": "from ₹220",
        "priceNote": "Medium 8\" ₹220 · King 12\" ₹460",
        "image": "/images/menu/1235803599.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235803600",
        "name": "Pepe Paneer Pizza",
        "description": "Paneer Capsicum Onion Paprika & Cheese Unite In This Flavourful Pizza",
        "price": 280,
        "priceLabel": "from ₹280",
        "priceNote": "Medium 8\" ₹280 · King 12\" ₹510",
        "image": "/images/menu/1235803600.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235803601",
        "name": "All In One Pizza",
        "description": "An Explosion Of Flavours Featuring Jalapenos Olives Paneer Veggies & Cheese",
        "price": 310,
        "priceLabel": "from ₹310",
        "priceNote": "Medium 8\" ₹310 · King 12\" ₹580",
        "image": "/images/menu/1235803601.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      }
    ]
  },
  {
    "id": "542968",
    "name": "BEVERAGES",
    "slug": "beverages",
    "items": [
      {
        "id": "1281823413",
        "name": "Spicy Lemonade",
        "description": "A Refreshing Desi Drink With Tangy Lemon And A Spicy Kick",
        "price": 140,
        "priceLabel": "₹140",
        "priceNote": null,
        "image": "/images/menu/1281823413.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235804997",
        "name": "Virgin Mojito",
        "description": "A Refreshing Soda Mocktail Made With Fresh Mint, Zesty Lime, And A Sparkling Twist",
        "price": 140,
        "priceLabel": "₹140",
        "priceNote": null,
        "image": "/images/menu/1235804997.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1246597169",
        "name": "Ras Malai Retreat",
        "description": "Beloved Indian Dessert With Richness Of Creamy Milk & Saffron",
        "price": 140,
        "priceLabel": "from ₹140",
        "priceNote": null,
        "image": "/images/menu/1246597169.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1272145652",
        "name": "Strawberry Sensation",
        "description": "Sip Into Strawberry Heaven With Our Delightful Milkshake",
        "price": 140,
        "priceLabel": "from ₹140",
        "priceNote": null,
        "image": "/images/menu/1272145652.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235804999",
        "name": "Cold Coffee Craze",
        "description": "Classic Symphony Of Rich Coffee & Creamy Goodness",
        "price": 140,
        "priceLabel": "from ₹140",
        "priceNote": null,
        "image": "/images/menu/1235804999.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235805000",
        "name": "Oreo Obsession",
        "description": "Velvety Smoothness Meets Crunchy Oreo",
        "price": 140,
        "priceLabel": "from ₹140",
        "priceNote": null,
        "image": "/images/menu/1235805000.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235806177",
        "name": "Water Bottle",
        "description": "1 Litre Mineral Water Bottle",
        "price": 20,
        "priceLabel": "₹20",
        "priceNote": null,
        "image": "/images/menu/1235806177.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1301229748",
        "name": "Banarasi Paan Fusion",
        "description": "",
        "price": 140,
        "priceLabel": "from ₹140",
        "priceNote": null,
        "image": "/images/menu/1301229748.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      }
    ]
  },
  {
    "id": "542966",
    "name": "GARLIC BREAD",
    "slug": "garlic-bread",
    "items": [
      {
        "id": "1235807474",
        "name": "Stuff Supreme Garlic Bread",
        "description": "Packed With Jalapenos Olives Corn & A Little Veggies With Cheese",
        "price": 200,
        "priceLabel": "₹200",
        "priceNote": null,
        "image": "/images/menu/1235807474.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235807475",
        "name": "Loaf Cheese Garlic Bread",
        "description": "A Classic Treat Filled Solely With Delicious Cheese",
        "price": 180,
        "priceLabel": "₹180",
        "priceNote": null,
        "image": "/images/menu/1235807475.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235807473",
        "name": "Stuff Corn Garlic Bread",
        "description": "Cheese & Corn Combined For A Flavourful Twist",
        "price": 180,
        "priceLabel": "₹180",
        "priceNote": null,
        "image": "/images/menu/1235807473.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235807472",
        "name": "Stuff Cheese Garlic Bread",
        "description": "A Delightful Blend Of Gooey Cheese Stuffed Within",
        "price": 150,
        "priceLabel": "₹150",
        "priceNote": null,
        "image": "/images/menu/1235807472.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      }
    ]
  },
  {
    "id": "1262830",
    "name": "TASTE MAKER DIPS",
    "slug": "taste-maker-dips",
    "items": [
      {
        "id": "1235817225",
        "name": "Burger Sause",
        "description": "Tangy, Creamy Burger Sauce – A Perfect Dip",
        "price": 20,
        "priceLabel": "₹20",
        "priceNote": null,
        "image": "/images/menu/1235817225.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235817224",
        "name": "Mayo Dip",
        "description": "Smooth, Creamy Classic Dip",
        "price": 20,
        "priceLabel": "₹20",
        "priceNote": null,
        "image": "/images/menu/1235817224.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235817223",
        "name": "Liquid Cheese",
        "description": "Rich, Melty Cheese Delight",
        "price": 20,
        "priceLabel": "₹20",
        "priceNote": null,
        "image": "/images/menu/1235817223.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235817221",
        "name": "Chilli Garlic Dip",
        "description": "Bold, Spicy Garlic Punch",
        "price": 20,
        "priceLabel": "₹20",
        "priceNote": null,
        "image": "/images/menu/1235817221.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1235879171",
        "name": "Cheese Slice",
        "description": "An extra cheese slice upgrade on your burger",
        "price": 15,
        "priceLabel": "₹15",
        "priceNote": null,
        "image": "/images/menu/1235879171.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1289043884",
        "name": "Lettuce",
        "description": "",
        "price": 10,
        "priceLabel": "₹10",
        "priceNote": null,
        "image": "/images/menu/1289043884.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      }
    ]
  },
  {
    "id": "543664",
    "name": "DESSERTS",
    "slug": "desserts",
    "items": [
      {
        "id": "8185399",
        "name": "Choco Lava Cake",
        "description": "Dessert With A Hot Liquid Chocolate Filled Inside",
        "price": 100,
        "priceLabel": "₹100",
        "priceNote": null,
        "image": "/images/menu/8185399.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1305321573",
        "name": "Mango Malai Cake",
        "description": "Cake Assorted With Malai & A Layer Of Mango Pulp",
        "price": 59,
        "priceLabel": "₹59",
        "priceNote": null,
        "image": "/images/menu/1305321573.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1260897616",
        "name": "Strawberry Malai Cake",
        "description": "Cake Assorted With Malai & Garnished With A Layer Of Strawberry Pulp",
        "price": 59,
        "priceLabel": "₹59",
        "priceNote": null,
        "image": "/images/menu/1260897616.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": false
      },
      {
        "id": "1306900281",
        "name": "Strawberry Malai Cake ( Dairy Free )",
        "description": "",
        "price": 59,
        "priceLabel": "₹59",
        "priceNote": null,
        "image": "/images/menu/1306900281.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": true
      },
      {
        "id": "1306900280",
        "name": "Mango Malai Cake ( Dairy Free )",
        "description": "",
        "price": 59,
        "priceLabel": "₹59",
        "priceNote": null,
        "image": "/images/menu/1306900280.webp",
        "hasRemoteImage": true,
        "isJain": false,
        "isDairyFree": true
      }
    ]
  }
];

export const FEATURED_IMAGES = {
  "paneerHerbinaro": "/images/menu/1304877615.webp",
  "maharaja": "/images/menu/1235799476.webp",
  "chilliLava": "/images/menu/1235799472.webp",
  "supreme": "/images/menu/1235799471.webp",
  "alooTikki": "/images/menu/1256647960.webp",
  "allInOnePizza": "/images/menu/1235803601.webp",
  "margherita": "/images/menu/1235802964.webp",
  "dressingFries": "/images/menu/1279905805.webp",
  "periPeriFries": "/images/menu/1235804992.webp",
  "chocoLava": "/images/menu/8185399.webp",
  "virginMojito": "/images/menu/1235804997.webp",
  "garlicSupreme": "/images/menu/1235807474.webp",
  "paneerWrap": "/images/menu/1250936249.webp",
  "about1": "/images/about-svs-1.webp",
  "about2": "/images/about-svs-2.webp",
  "about3": "/images/about-svs-3.webp",
  "burgerH": "/images/burgerH.webp"
} as const;

export const TOTAL_ITEMS = MENU_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
