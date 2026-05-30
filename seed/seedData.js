/**
 * Seed script: Adds food items and restaurants to the Feasto database
 * Run with: node seed/seedData.js
 */
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

import { prisma } from "../config/prisma.js";

const restaurants = [
  {
    name: "Punjabi Rasoi",
    city: "Delhi",
    address: "Connaught Place, New Delhi 110001",
    cuisine: "North Indian",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop",
  },
  {
    name: "Hyderabadi Biryani House",
    city: "Hyderabad",
    address: "Banjara Hills, Hyderabad 500034",
    cuisine: "Hyderabadi",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=800&auto=format&fit=crop",
  },
  {
    name: "Mumbai Tawa Treats",
    city: "Mumbai",
    address: "Marine Drive, Mumbai 400020",
    cuisine: "Street Food",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&auto=format&fit=crop",
  },
  {
    name: "Bengal Delight",
    city: "Kolkata",
    address: "Park Street, Kolkata 700016",
    cuisine: "Bengali",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&auto=format&fit=crop",
  },
  {
    name: "Chennai Andhra Spice",
    city: "Chennai",
    address: "T Nagar, Chennai 600017",
    cuisine: "South Indian",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop",
  },
  {
    name: "Rajputana Haveli",
    city: "Jaipur",
    address: "MI Road, Jaipur 302001",
    cuisine: "Rajasthani",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&auto=format&fit=crop",
  },
  {
    name: "Amritsar Dhaba",
    city: "Amritsar",
    address: "Golden Temple Road, Amritsar 143001",
    cuisine: "Punjabi",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop",
  },
  {
    name: "The Coastal Kitchen",
    city: "Goa",
    address: "Calangute Beach Road, Goa 403516",
    cuisine: "Seafood & Goan",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop",
  },
];

const foods = [
  // Biryani
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken, whole spices, and saffron. Served with raita and mirchi ka salan.",
    price: 14.99,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=600&auto=format&fit=crop",
  },
  {
    name: "Mutton Biryani",
    description: "Slow-cooked Dum biryani with tender mutton pieces, caramelized onions, and aromatic spices.",
    price: 18.99,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop",
  },
  {
    name: "Veg Biryani",
    description: "Fragrant basmati rice cooked with seasonal vegetables, nuts, and a blend of spices.",
    price: 11.99,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=600&auto=format&fit=crop",
  },

  // Pizza
  {
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella, basil leaves, and San Marzano tomato sauce on a crispy thin crust.",
    price: 12.99,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop",
  },
  {
    name: "Chicken BBQ Pizza",
    description: "Smoky BBQ sauce base with grilled chicken strips, red onions, jalapeños, and melted mozzarella.",
    price: 15.99,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&auto=format&fit=crop",
  },
  {
    name: "Paneer Tikka Pizza",
    description: "Fusion pizza with tandoori paneer tikka, capsicum, onions, and mint chutney drizzle.",
    price: 14.49,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&auto=format&fit=crop",
  },

  // Rolls
  {
    name: "Chicken Kathi Roll",
    description: "Flaky paratha wrapped with spiced grilled chicken, onions, green chutney, and lemon.",
    price: 8.99,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop",
  },
  {
    name: "Paneer Tikka Roll",
    description: "Soft roti stuffed with smoky paneer tikka pieces, fresh veggies, and tangy yogurt dip.",
    price: 7.99,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop",
  },

  // Salad
  {
    name: "Greek Salad",
    description: "Fresh cucumbers, tomatoes, olives, red onions, and feta cheese with olive oil and oregano dressing.",
    price: 9.99,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop",
  },
  {
    name: "Caesar Salad",
    description: "Crispy romaine lettuce, croutons, parmesan shavings with classic Caesar dressing.",
    price: 10.49,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&auto=format&fit=crop",
  },

  // Pasta
  {
    name: "Spaghetti Bolognese",
    description: "Classic Italian pasta with rich beef and tomato Bolognese sauce, topped with parmesan.",
    price: 13.99,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&auto=format&fit=crop",
  },
  {
    name: "Penne Arrabiata",
    description: "Penne pasta in a spicy tomato and garlic sauce, topped with fresh basil and olive oil.",
    price: 11.99,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=600&auto=format&fit=crop",
  },

  // Noodles
  {
    name: "Hakka Noodles",
    description: "Stir-fried noodles with fresh vegetables, soy sauce, and Chinese spices.",
    price: 9.99,
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&auto=format&fit=crop",
  },
  {
    name: "Schezwan Chicken Noodles",
    description: "Spicy stir-fried noodles with chicken, vegetables in fiery Schezwan sauce.",
    price: 11.49,
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=600&auto=format&fit=crop",
  },

  // Deserts
  {
    name: "Gulab Jamun",
    description: "Soft milk-solid khoya balls fried golden and soaked in rose-flavored sugar syrup.",
    price: 5.99,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop",
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm dark chocolate cake with a flowing molten center, served with vanilla ice cream.",
    price: 8.99,
    category: "Deserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop",
  },

  // Sandwich
  {
    name: "Grilled Veggie Sandwich",
    description: "Whole wheat bread with grilled zucchini, peppers, spinach, hummus and pesto.",
    price: 8.49,
    category: "Sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop",
  },
  {
    name: "Chicken Club Sandwich",
    description: "Triple-layered sandwich with grilled chicken, bacon, lettuce, tomato, and mayo.",
    price: 10.99,
    category: "Sandwich",
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=600&auto=format&fit=crop",
  },

  // Pure Veg
  {
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked overnight with butter, cream, tomatoes, and aromatic spices.",
    price: 10.99,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop",
  },
  {
    name: "Palak Paneer",
    description: "Fresh cottage cheese cubes in a velvety spinach gravy with garlic and cream.",
    price: 12.49,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop",
  },

  // Cake
  {
    name: "Red Velvet Cake",
    description: "Moist red velvet layers with cream cheese frosting, served chilled.",
    price: 6.99,
    category: "Cake",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&auto=format&fit=crop",
  },
];

async function seed() {
  try {
    console.log("🌱 Starting Feasto seed...\n");

    // --- Seed Restaurants ---
    console.log("📍 Seeding restaurants...");
    let restaurantsAdded = 0;
    let restaurantsSkipped = 0;

    for (const r of restaurants) {
      // Check for duplicates by name + city
      const existing = await prisma.restaurant.findFirst({
        where: { name: r.name, city: r.city },
      });
      if (existing) {
        console.log(`   ⏭️  Skipping "${r.name}" (already exists)`);
        restaurantsSkipped++;
      } else {
        await prisma.restaurant.create({ data: r });
        console.log(`   ✅ Added "${r.name}" (${r.city})`);
        restaurantsAdded++;
      }
    }

    console.log(`\n   Restaurants: ${restaurantsAdded} added, ${restaurantsSkipped} skipped\n`);

    // --- Seed Foods ---
    console.log("🍽️  Seeding food items...");
    let foodsAdded = 0;
    let foodsSkipped = 0;

    for (const f of foods) {
      const existing = await prisma.food.findFirst({
        where: { name: f.name },
      });
      if (existing) {
        console.log(`   ⏭️  Skipping "${f.name}" (already exists)`);
        foodsSkipped++;
      } else {
        await prisma.food.create({ data: f });
        console.log(`   ✅ Added "${f.name}" (${f.category})`);
        foodsAdded++;
      }
    }

    console.log(`\n   Foods: ${foodsAdded} added, ${foodsSkipped} skipped\n`);

    // Stats
    const totalRestaurants = await prisma.restaurant.count();
    const totalFoods = await prisma.food.count();
    console.log("📊 Database totals:");
    console.log(`   Restaurants: ${totalRestaurants}`);
    console.log(`   Food Items:  ${totalFoods}\n`);
    console.log("✨ Seed complete!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
