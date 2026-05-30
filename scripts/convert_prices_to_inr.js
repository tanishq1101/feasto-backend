import { prisma } from "../config/prisma.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

async function convertPrices() {
  try {
    console.log("🔄 Starting database price conversion to INR...");
    const foods = await prisma.food.findMany();
    
    let updatedCount = 0;
    for (const food of foods) {
      // If price is under 50, it is in USD, so we convert it to INR (e.g., multiplying by 20)
      if (food.price < 50) {
        const oldPrice = food.price;
        // Multiply by 20 and round to nearest 10 for neat market pricing (e.g., 299.8 -> 300)
        const inrPrice = Math.round((oldPrice * 20) / 10) * 10;
        
        await prisma.food.update({
          where: { id: food.id },
          data: { price: inrPrice },
        });
        
        console.log(`   ✅ Converted "${food.name}": $${oldPrice} ➔ ₹${inrPrice}`);
        updatedCount++;
      } else {
        console.log(`   ⏭️  Skipped "${food.name}": already ₹${food.price}`);
      }
    }
    
    console.log(`\n🎉 Conversion complete! Updated ${updatedCount} food items.`);
  } catch (error) {
    console.error("❌ Conversion failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

convertPrices();
