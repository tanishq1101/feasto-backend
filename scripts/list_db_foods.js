import { prisma } from "../config/prisma.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

async function listDBFoods() {
  try {
    const foods = await prisma.food.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        image: true,
        price: true
      },
      orderBy: { category: "asc" }
    });
    console.log("DATABASE_FOODS_JSON_START");
    console.log(JSON.stringify(foods, null, 2));
    console.log("DATABASE_FOODS_JSON_END");
  } catch (error) {
    console.error("Error fetching foods:", error);
  } finally {
    await prisma.$disconnect();
  }
}

listDBFoods();
