import { prisma } from "../config/prisma.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const restaurants = [
  // Delhi
  {
    id: "rest-delhi-01",
    name: "Punjabi Rasoi",
    city: "Delhi",
    address: "Connaught Place, New Delhi 110001",
    cuisine: "North Indian, Pure Veg",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-delhi-02",
    name: "Delhi Bowl House",
    city: "Delhi",
    address: "Saket, New Delhi 110017",
    cuisine: "Street Food, Rolls, Sandwich",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-delhi-03",
    name: "Connaught Diner",
    city: "Delhi",
    address: "Connaught Place, New Delhi 110001",
    cuisine: "Italian, Pasta, Pizza, Salad",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
  },

  // Mumbai
  {
    id: "rest-mumbai-01",
    name: "Mumbai Tawa Treats",
    city: "Mumbai",
    address: "Marine Drive, Mumbai 400020",
    cuisine: "Street Food, Salad, Sandwich",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-mumbai-02",
    name: "Marine Bay Bistro",
    city: "Mumbai",
    address: "Colaba, Mumbai 400005",
    cuisine: "Italian, Pizza, Pasta",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-mumbai-03",
    name: "Bollywood Bites",
    city: "Mumbai",
    address: "Andheri West, Mumbai 400053",
    cuisine: "North Indian, Pure Veg, Rolls",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop",
  },

  // Kolkata
  {
    id: "rest-kolkata-01",
    name: "Bengal Delight",
    city: "Kolkata",
    address: "Park Street, Kolkata 700016",
    cuisine: "Bengali, Pure Veg, Cake",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-kolkata-02",
    name: "Park Street Kitchen",
    city: "Kolkata",
    address: "Park Street, Kolkata 700016",
    cuisine: "Chinese, Noodles, Biryani",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-kolkata-03",
    name: "Howrah Sweet & Cafe",
    city: "Kolkata",
    address: "Howrah, Kolkata 711101",
    cuisine: "Deserts, Cake, Pure Veg",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop",
  },

  // Chennai
  {
    id: "rest-chennai-01",
    name: "Chennai Andhra Spice",
    city: "Chennai",
    address: "T Nagar, Chennai 600017",
    cuisine: "South Indian, Pure Veg",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-chennai-02",
    name: "Southern Heritage",
    city: "Chennai",
    address: "Adyar, Chennai 600020",
    cuisine: "South Indian, Biryani",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
  },

  // Hyderabad
  {
    id: "rest-hyd-01",
    name: "Hyderabadi Biryani House",
    city: "Hyderabad",
    address: "Banjara Hills, Hyderabad 500034",
    cuisine: "Biryani, Hyderabadi, Noodles",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-hyd-02",
    name: "Charminar Grill",
    city: "Hyderabad",
    address: "Charminar, Hyderabad 500002",
    cuisine: "Biryani, North Indian",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-hyd-03",
    name: "Deccan Spice",
    city: "Hyderabad",
    address: "Gachibowli, Hyderabad 500032",
    cuisine: "Biryani, South Indian",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop",
  },

  // Jaipur
  {
    id: "rest-jaipur-01",
    name: "Rajputana Haveli",
    city: "Jaipur",
    address: "MI Road, Jaipur 302001",
    cuisine: "Rajasthani, Pure Veg",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-jaipur-02",
    name: "Pink City Palace",
    city: "Jaipur",
    address: "C Scheme, Jaipur 302001",
    cuisine: "Rajasthani, Salad",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
  },

  // Amritsar
  {
    id: "rest-amritsar-01",
    name: "Amritsar Dhaba",
    city: "Amritsar",
    address: "Golden Temple Road, Amritsar 143001",
    cuisine: "Punjabi, Pure Veg",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-amritsar-02",
    name: "Golden Temple Kitchen",
    city: "Amritsar",
    address: "Town Hall, Amritsar 143001",
    cuisine: "Punjabi, Street Food",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&auto=format&fit=crop",
  },

  // Goa
  {
    id: "rest-goa-01",
    name: "The Coastal Kitchen",
    city: "Goa",
    address: "Calangute Beach Road, Goa 403516",
    cuisine: "Goan, Seafood, Pure Veg",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-goa-02",
    name: "Shack Bites",
    city: "Goa",
    address: "Baga Beach, Goa 403516",
    cuisine: "Goan, Sandwich, Pizza",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
  },

  // Lucknow
  {
    id: "rest-lucknow-01",
    name: "Biryani Ghar",
    city: "Lucknow",
    address: "Hazratganj, Lucknow 226001",
    cuisine: "Biryani, Awadhi",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-lucknow-02",
    name: "Awadh Kitchen",
    city: "Lucknow",
    address: "Gomti Nagar, Lucknow 226010",
    cuisine: "North Indian, Pure Veg",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop",
  },

  // Bangalore
  {
    id: "rest-bangalore-01",
    name: "Bangalore Garden Kitchen",
    city: "Bangalore",
    address: "Indiranagar, Bangalore 560038",
    cuisine: "Pure Veg, Salad",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-bangalore-02",
    name: "Indiranagar Bistro",
    city: "Bangalore",
    address: "Indiranagar, Bangalore 560038",
    cuisine: "Italian, Pizza, Pasta, Salad",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
  },

  // Pune
  {
    id: "rest-pune-01",
    name: "Pune Pasta Co.",
    city: "Pune",
    address: "Koregaon Park, Pune 411001",
    cuisine: "Italian, Pasta, Salad",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop",
  },
  {
    id: "rest-pune-02",
    name: "Deccan Heights",
    city: "Pune",
    address: "FC Road, Pune 411004",
    cuisine: "North Indian, Chinese, Noodles",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
  },

  // Chandigarh
  {
    id: "rest-chandigarh-01",
    name: "Cafe Chandigarh",
    city: "Chandigarh",
    address: "Sector 17, Chandigarh 160017",
    cuisine: "Modern Indian, Pasta, Pizza",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
  },
];

const foods = [
  // --- Biryani ---
  {
    id: "food-biryani-01",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken, whole spices, and saffron. Served with raita.",
    price: 299,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop",
  },
  {
    id: "food-biryani-02",
    name: "Mutton Biryani",
    description: "Slow-cooked Dum biryani with tender mutton pieces, caramelized onions, and aromatic spices.",
    price: 349,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop",
  },
  {
    id: "food-biryani-03",
    name: "Veg Biryani",
    description: "Fragrant basmati rice cooked with seasonal vegetables, nuts, and a blend of spices.",
    price: 199,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop",
  },
  {
    id: "food-biryani-04",
    name: "Egg Biryani",
    description: "Spiced basmati rice layered with boiled eggs and caramelized onions, slow dum cooked.",
    price: 229,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop",
  },

  // --- Pizza ---
  {
    id: "food-pizza-01",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella, basil leaves, and tomato sauce on a crispy thin crust.",
    price: 199,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop",
  },
  {
    id: "food-pizza-02",
    name: "Chicken BBQ Pizza",
    description: "Smoky BBQ sauce base with grilled chicken strips, red onions, and melted mozzarella.",
    price: 299,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&auto=format&fit=crop",
  },
  {
    id: "food-pizza-03",
    name: "Paneer Tikka Pizza",
    description: "Fusion pizza with tandoori paneer tikka, capsicum, onions, and mint chutney drizzle.",
    price: 249,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&auto=format&fit=crop",
  },
  {
    id: "food-pizza-04",
    name: "Veg Supreme Pizza",
    description: "Topped with black olives, sweet corn, mushrooms, bell peppers, onions, and extra cheese.",
    price: 279,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop",
  },

  // --- Rolls ---
  {
    id: "food-roll-01",
    name: "Chicken Kathi Roll",
    description: "Flaky paratha wrapped with spiced grilled chicken, onions, green chutney, and lemon.",
    price: 129,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop",
  },
  {
    id: "food-roll-02",
    name: "Paneer Tikka Roll",
    description: "Soft roti stuffed with smoky paneer tikka pieces, fresh veggies, and tangy yogurt dip.",
    price: 99,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop",
  },
  {
    id: "food-roll-03",
    name: "Chicken Rolls",
    description: "Golden egg-layered wrap filled with shredded chicken masala and spiced onions.",
    price: 149,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop",
  },
  {
    id: "food-roll-04",
    name: "Veg Rolls",
    description: "Stir-fried vegetable mix rolled in a crispy flour wrap, served with hot sauce.",
    price: 89,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop",
  },
  {
    id: "food-roll-05",
    name: "Peri Peri Rolls",
    description: "Spicy peri peri glazed veggies and paneer cubes rolled in a warm wrap.",
    price: 99,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop",
  },
  {
    id: "food-roll-06",
    name: "Spring Rolls",
    description: "Crispy deep-fried rolls stuffed with seasoned minced vegetables and noodles.",
    price: 119,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop",
  },
  {
    id: "food-roll-07",
    name: "Tandoori Chicken Skewer",
    description: "Spicy tandoori chicken chunks grilled on skewers. Dry starter.",
    price: 249,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop",
  },

  // --- Salad ---
  {
    id: "food-salad-01",
    name: "Greek Salad",
    description: "Fresh cucumbers, tomatoes, olives, red onions, and feta cheese with olive oil dressing.",
    price: 129,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop",
  },
  {
    id: "food-salad-02",
    name: "Caesar Salad",
    description: "Crispy romaine lettuce, croutons, and parmesan shavings with classic Caesar dressing.",
    price: 149,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&auto=format&fit=crop",
  },
  {
    id: "food-salad-03",
    name: "Veg Salad",
    description: "Simple tossed garden salad with cucumber, tomato, carrot, and lemon dressing.",
    price: 119,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop",
  },
  {
    id: "food-salad-04",
    name: "Clover Salad",
    description: "Nutritious mix of microgreens, sprouts, sunflower seeds, and light vinaigrette.",
    price: 129,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop",
  },
  {
    id: "food-salad-05",
    name: "Chicken Salad",
    description: "Grilled chicken strips served over a bed of fresh greens, tomatoes, and olives.",
    price: 199,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&auto=format&fit=crop",
  },

  // --- Pasta ---
  {
    id: "food-pasta-01",
    name: "Spaghetti Bolognese",
    description: "Classic Italian spaghetti in a slow-cooked hearty minced tomato sauce.",
    price: 199,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&auto=format&fit=crop",
  },
  {
    id: "food-pasta-02",
    name: "Penne Arrabiata",
    description: "Penne pasta in a spicy tomato and garlic sauce, finished with fresh basil.",
    price: 149,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=600&auto=format&fit=crop",
  },
  {
    id: "food-pasta-03",
    name: "Tomato Pasta",
    description: "Simple and comforting pasta in a sweet and tangy tomato puree base.",
    price: 129,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&auto=format&fit=crop",
  },
  {
    id: "food-pasta-04",
    name: "Cheese Pasta",
    description: "Creamy macaroni pasta loaded with melted cheddar and mozzarella cheese.",
    price: 149,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=600&auto=format&fit=crop",
  },
  {
    id: "food-pasta-05",
    name: "Creamy Pasta",
    description: "Rich and velvety white sauce pasta tossed with broccoli and bell peppers.",
    price: 179,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&auto=format&fit=crop",
  },
  {
    id: "food-pasta-06",
    name: "Chicken Pasta",
    description: "Penne pasta with grilled chicken slices cooked in a garlic parmesan cream sauce.",
    price: 229,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=600&auto=format&fit=crop",
  },
  {
    id: "food-pasta-07",
    name: "Lasagna Rolls",
    description: "Lasagna sheets rolled with ricotta cheese and spinach, baked in marinara sauce.",
    price: 199,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&auto=format&fit=crop",
  },

  // --- Noodles ---
  {
    id: "food-noodle-01",
    name: "Hakka Noodles",
    description: "Stir-fried noodles with fresh vegetables, soy sauce, and Chinese five-spice.",
    price: 129,
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&auto=format&fit=crop",
  },
  {
    id: "food-noodle-02",
    name: "Schezwan Chicken Noodles",
    description: "Spicy stir-fried noodles with chicken, eggs, and veggies in fiery Schezwan sauce.",
    price: 179,
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=600&auto=format&fit=crop",
  },
  {
    id: "food-noodle-03",
    name: "Veg Noodles",
    description: "Traditional street-style stir-fried noodles with cabbage, carrots, and onions.",
    price: 99,
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&auto=format&fit=crop",
  },
  {
    id: "food-noodle-04",
    name: "Somen Noodles",
    description: "Thin Japanese-style wheat noodles served chilled with a savory dipping sauce.",
    price: 149,
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&auto=format&fit=crop",
  },
  {
    id: "food-noodle-05",
    name: "Butter Noodles",
    description: "Egg noodles tossed with melted garlic butter, parsley, and cracked black pepper.",
    price: 119,
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&auto=format&fit=crop",
  },
  {
    id: "food-noodle-06",
    name: "Cooked Noodles",
    description: "Boiled noodles stir-fried in hot sesame oil with scallions and garlic.",
    price: 129,
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&auto=format&fit=crop",
  },

  // --- Deserts ---
  {
    id: "food-desert-01",
    name: "Gulab Jamun",
    description: "Soft milk-solid khoya balls fried golden brown and soaked in hot rose sugar syrup.",
    price: 79,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?w=600&auto=format&fit=crop",
  },
  {
    id: "food-desert-02",
    name: "Rasgulla",
    description: "Spongy cottage cheese balls soaked in a light, sweet sugar syrup. Chilled.",
    price: 89,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop",
  },
  {
    id: "food-desert-03",
    name: "Rasmalai",
    description: "Flattened paneer discs soaked in sweet, thickened milk flavored with cardamom and pistachios.",
    price: 119,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop",
  },
  {
    id: "food-desert-04",
    name: "Kheer",
    description: "Traditional Indian rice pudding simmered with milk, sugar, and almonds.",
    price: 99,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?w=600&auto=format&fit=crop",
  },
  {
    id: "food-desert-05",
    name: "Chocolate Lava Cake",
    description: "Warm dark chocolate cake with a molten center, served with vanilla scoop.",
    price: 99,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop",
  },
  {
    id: "food-desert-06",
    name: "Vanilla Ice Cream",
    description: "Creamy vanilla bean ice cream scoop topped with chocolate syrup.",
    price: 49,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop",
  },
  {
    id: "food-desert-07",
    name: "Butterscotch Ice Cream",
    description: "Rich butterscotch scoop loaded with caramelized crunch bits.",
    price: 79,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop",
  },
  {
    id: "food-desert-08",
    name: "Jar Ice Cream",
    description: "Layered cake crumbs, fudge sauce, and soft serve ice cream in a reusable jar.",
    price: 79,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop",
  },
  {
    id: "food-desert-09",
    name: "Ripple Ice Cream",
    description: "Strawberry ripple ice cream scoop swirled with fresh berry compote.",
    price: 79,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop",
  },
  {
    id: "food-desert-10",
    name: "Fruit Ice Cream",
    description: "Premium ice cream scoop blended with dried fruits, nuts, and cherries.",
    price: 119,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop",
  },

  // --- Sandwich ---
  {
    id: "food-sandwich-01",
    name: "Grilled Veggie Sandwich",
    description: "Whole wheat bread filled with grilled zucchini, peppers, and house pesto.",
    price: 99,
    category: "Sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop",
  },
  {
    id: "food-sandwich-02",
    name: "Chicken Club Sandwich",
    description: "Triple-layered sandwich loaded with grilled chicken, egg, lettuce, and mayo.",
    price: 149,
    category: "Sandwich",
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=600&auto=format&fit=crop",
  },
  {
    id: "food-sandwich-03",
    name: "Chicken Sandwich",
    description: "Toasted bread with seasoned shredded chicken filling and cheddar cheese.",
    price: 129,
    category: "Sandwich",
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=600&auto=format&fit=crop",
  },
  {
    id: "food-sandwich-04",
    name: "Vegan Sandwich",
    description: "Avocado mash, cucumber, sprouts, and vegan mayo on toasted sourdough bread.",
    price: 149,
    category: "Sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop",
  },
  {
    id: "food-sandwich-05",
    name: "Grilled Sandwich",
    description: "Classic grilled cheese sandwich with cheddar, mozzarella, and dynamic herbs.",
    price: 99,
    category: "Sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop",
  },
  {
    id: "food-sandwich-06",
    name: "Bread Sandwich",
    description: "Butter-slathered white bread sandwich filled with cucumber and tomato slices.",
    price: 79,
    category: "Sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop",
  },
  {
    id: "food-sandwich-07",
    name: "Paneer Grilled Sandwich",
    description: "Toasted bread with a spicy paneer bhurji and cheese slice stuffing.",
    price: 119,
    category: "Sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop",
  },

  // --- Pure Veg ---
  {
    id: "food-veg-01",
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked overnight with butter, cream, and tomatoes.",
    price: 149,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-02",
    name: "Palak Paneer",
    description: "Cottage cheese cubes cooked in a vibrant, spiced spinach gravy with cream.",
    price: 179,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-03",
    name: "Samosas",
    description: "Crispy triangular pastries filled with spiced potato masala and peas. 2 pieces.",
    price: 49,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-04",
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with two large puffed deep-fried breads and pickles.",
    price: 129,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-05",
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes in a rich, sweet, and mildly spiced tomato cashew gravy.",
    price: 199,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-06",
    name: "Chana Masala",
    description: "Zesty and tangy chickpea curry cooked with onions, tomatoes, and dry spices.",
    price: 129,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-07",
    name: "Mix Veg Pulao",
    description: "Fragrant basmati rice tossed with fresh green peas, beans, and carrots.",
    price: 119,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-08",
    name: "Rice Zucchini",
    description: "Stir-fried zucchini and rice tossed with light herbs and butter.",
    price: 129,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-09",
    name: "Garlic Mushroom",
    description: "Button mushrooms sauteed in butter with minced garlic, herbs, and lemon.",
    price: 149,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-10",
    name: "Fried Cauliflower",
    description: "Crispy batter-fried cauliflower florets tossed with garlic and soy sauce.",
    price: 129,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-11",
    name: "Butter Chicken Curry",
    description: "Tandoori chicken pieces cooked in a rich, buttery tomato gravy. Non-veg classic.",
    price: 269,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop",
  },
  {
    id: "food-veg-12",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato mash, served with sambar and coconut chutney.",
    price: 99,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&auto=format&fit=crop",
  },

  // --- Cake ---
  {
    id: "food-cake-01",
    name: "Red Velvet Cake",
    description: "Moist red velvet cake layer with sweet cream cheese frosting.",
    price: 129,
    category: "Cake",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
  },
  {
    id: "food-cake-02",
    name: "Cup Cake",
    description: "Mini vanilla sponge cupcake topped with buttercream rosette.",
    price: 49,
    category: "Cake",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
  },
  {
    id: "food-cake-03",
    name: "Sliced Cake",
    description: "A slice of soft sponge cake loaded with mixed fruit jam.",
    price: 79,
    category: "Cake",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
  },
  {
    id: "food-cake-04",
    name: "Butterscotch Cake",
    description: "Sweet layers of butterscotch cake covered in crunch praline bits.",
    price: 149,
    category: "Cake",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
  },
  {
    id: "food-cake-05",
    name: "Vegan Cake",
    description: "Plant-based eggless chocolate cake with chocolate ganache drizzle.",
    price: 129,
    category: "Cake",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
  },
  {
    id: "food-cake-06",
    name: "Black Forest Cake",
    description: "Layers of chocolate sponge, whipped cream, and cherries, topped with chocolate shavings.",
    price: 139,
    category: "Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop",
  },
  {
    id: "food-cake-07",
    name: "Chocolate Truffle Cake",
    description: "Dense, rich chocolate cake coated in premium chocolate glaze.",
    price: 159,
    category: "Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop",
  },
];

async function main() {
  try {
    console.log("🔥 Starting database reset & rich scaling...");
    
    // Clean old records
    console.log("   🧹 Cleaning food table...");
    await prisma.food.deleteMany();
    
    console.log("   🧹 Cleaning restaurant table...");
    await prisma.restaurant.deleteMany();

    console.log("   📍 Seeding scaled restaurants...");
    let restCount = 0;
    for (const r of restaurants) {
      await prisma.restaurant.create({ data: r });
      console.log(`      ✅ Seeded restaurant: ${r.name} (${r.city})`);
      restCount++;
    }

    console.log("   🍽️ Seeding scaled food items...");
    let foodCount = 0;
    for (const f of foods) {
      await prisma.food.create({ data: f });
      console.log(`      ✅ Seeded food: ${f.name} (₹${f.price})`);
      foodCount++;
    }

    console.log(`\n🎉 Reset & seeding complete! Seeded ${restCount} restaurants and ${foodCount} foods.`);
  } catch (error) {
    console.error("❌ Reset seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
