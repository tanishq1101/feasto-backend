import { prisma } from "../config/prisma.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const charmPricesMap = {
  // Biryani
  "Chicken Biryani": 299,
  "Mutton Biryani": 349,
  "Veg Biryani": 199,

  // Pizza
  "Margherita Pizza": 199,
  "Chicken BBQ Pizza": 299,
  "Paneer Tikka Pizza": 249,

  // Rolls
  "Chicken Kathi Roll": 129,
  "Paneer Tikka Roll": 99,
  "Chicken Rolls": 149,
  "Veg Rolls": 89,
  "Peri Peri Rolls": 99,

  // Salad
  "Greek Salad": 129,
  "Greek salad": 129,
  "Caesar Salad": 149,
  "Veg Salad": 119,
  "Veg salad": 119,
  "Clover Salad": 129,
  "Chicken Salad": 199,

  // Pasta
  "Spaghetti Bolognese": 199,
  "Penne Arrabiata": 149,
  "Tomato Pasta": 129,
  "Cheese Pasta": 149,
  "Creamy Pasta": 179,
  "Chicken Pasta": 229,
  "Lasagna Rolls": 199,

  // Noodles
  "Hakka Noodles": 129,
  "Schezwan Chicken Noodles": 179,
  "Veg Noodles": 99,
  "Somen Noodles": 149,
  "Butter Noodles": 119,
  "Cooked Noodles": 129,

  // Desserts / Cake
  "Gulab Jamun": 79,
  "Chocolate Lava Cake": 99,
  "Red Velvet Cake": 129,
  "Cup Cake": 49,
  "Sliced Cake": 79,
  "Butterscotch Cake": 149,
  "Vegan Cake": 129,
  "Jar Ice Cream": 79,
  "Vanilla Ice Cream": 49,
  "Ripple Ice Cream": 79,
  "Fruit Ice Cream": 119,

  // Sandwich
  "Grilled Veggie Sandwich": 99,
  "Chicken Club Sandwich": 149,
  "Chicken Sandwich": 129,
  "Vegan Sandwich": 149,
  "Grilled Sandwich": 99,
  "Bread Sandwich": 79,

  // Pure Veg
  "Dal Makhani": 149,
  "Palak Paneer": 179,
  "Fried Cauliflower": 129,
  "Garlic Mushroom": 149,
  "Rice Zucchini": 129,
  "Mix Veg Pulao": 119
};

async function applyCharmPrices() {
  try {
    console.log("🔄 Starting database charm price conversion to INR...");
    const foods = await prisma.food.findMany();
    
    let updatedCount = 0;
    for (const food of foods) {
      const mappedPrice = charmPricesMap[food.name];
      if (mappedPrice) {
        await prisma.food.update({
          where: { id: food.id },
          data: { price: mappedPrice },
        });
        console.log(`   ✅ Updated "${food.name}" to ₹${mappedPrice}`);
        updatedCount++;
      } else {
        // Fallback: round to nearest 10 and subtract 1 to end in 9
        const fallbackPrice = Math.round(food.price / 10) * 10 - 1;
        await prisma.food.update({
          where: { id: food.id },
          data: { price: fallbackPrice },
        });
        console.log(`   ⚠️ Mapped "${food.name}" to fallback charm price ₹${fallbackPrice}`);
        updatedCount++;
      }
    }
    
    console.log(`\n🎉 Charm pricing complete! Updated ${updatedCount} food items.`);
  } catch (error) {
    console.error("❌ Conversion failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

applyCharmPrices();
