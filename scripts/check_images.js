import { prisma } from "../config/prisma.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith("http")) {
      resolve({ url, status: "LOCAL_OR_EMPTY" });
      return;
    }
    
    https.request(url, { method: "HEAD" }, (res) => {
      resolve({ url, status: res.statusCode });
    })
    .on("error", (err) => {
      resolve({ url, status: `ERROR: ${err.message}` });
    })
    .end();
  });
}

async function checkAllImages() {
  try {
    const foods = await prisma.food.findMany({
      select: { name: true, image: true }
    });
    const restaurants = await prisma.restaurant.findMany({
      select: { name: true, image: true }
    });

    console.log("Checking food images...");
    for (const food of foods) {
      const res = await checkUrl(food.image);
      console.log(`Food "${food.name}": Status ${res.status} (URL: ${food.image})`);
    }

    console.log("\nChecking restaurant images...");
    for (const rest of restaurants) {
      const res = await checkUrl(rest.image);
      console.log(`Restaurant "${rest.name}": Status ${res.status} (URL: ${rest.image})`);
    }
  } catch (error) {
    console.error("Error checking images:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllImages();
