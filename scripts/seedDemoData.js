import dotenv from "dotenv";
dotenv.config();

const description = "Freshly prepared with quality ingredients and bold flavor.";

const foods = [
  ["demo-food-01", "Greek salad", "1760206688542-food_1.png", 12, "Salad"],
  ["demo-food-02", "Veg salad", "1760206740862-food_2.png", 18, "Salad"],
  ["demo-food-03", "Clover Salad", "1760206780221-food_3.png", 16, "Salad"],
  ["demo-food-04", "Chicken Salad", "1760206828271-food_4.png", 24, "Salad"],
  ["demo-food-05", "Lasagna Rolls", "1760206961010-food_5.png", 14, "Rolls"],
  ["demo-food-06", "Peri Peri Rolls", "1760206995451-food_6.png", 12, "Rolls"],
  ["demo-food-07", "Chicken Rolls", "1760207024763-food_7.png", 20, "Rolls"],
  ["demo-food-08", "Veg Rolls", "1760207060310-food_8.png", 15, "Rolls"],
  ["demo-food-09", "Ripple Ice Cream", "1760207115641-food_9.png", 14, "Deserts"],
  ["demo-food-10", "Fruit Ice Cream", "1760207154276-food_10.png", 22, "Deserts"],
  ["demo-food-11", "Jar Ice Cream", "1760207244675-food_11.png", 10, "Deserts"],
  ["demo-food-12", "Vanilla Ice Cream", "1760207290771-food_12.png", 12, "Deserts"],
  ["demo-food-13", "Chicken Sandwich", "1760207338895-food_13.png", 12, "Sandwich"],
  ["demo-food-14", "Vegan Sandwich", "1760207392603-food_14.png", 18, "Sandwich"],
  ["demo-food-15", "Grilled Sandwich", "1760207442463-food_15.png", 16, "Sandwich"],
  ["demo-food-16", "Bread Sandwich", "1760207490557-food_16.png", 24, "Sandwich"],
  ["demo-food-17", "Cup Cake", "1760207521748-food_17.png", 14, "Cake"],
  ["demo-food-18", "Vegan Cake", "1760207548485-food_18.png", 12, "Cake"],
  ["demo-food-19", "Butterscotch Cake", "1760207604520-food_19.png", 20, "Cake"],
  ["demo-food-20", "Sliced Cake", "1760207635644-food_20.png", 15, "Cake"],
  ["demo-food-21", "Garlic Mushroom", "1760207699756-food_21.png", 14, "Pure Veg"],
  ["demo-food-22", "Fried Cauliflower", "1760207746367-food_22.png", 22, "Pure Veg"],
  ["demo-food-23", "Mix Veg Pulao", "1760207777136-food_23.png", 10, "Pure Veg"],
  ["demo-food-24", "Rice Zucchini", "1760207815333-food_24.png", 12, "Pure Veg"],
  ["demo-food-25", "Cheese Pasta", "1760207855638-food_25.png", 12, "Pasta"],
  ["demo-food-26", "Tomato Pasta", "1760207918797-food_26.png", 18, "Pasta"],
  ["demo-food-27", "Creamy Pasta", "1760207948321-food_27.png", 16, "Pasta"],
  ["demo-food-28", "Chicken Pasta", "1760207979943-food_28.png", 24, "Pasta"],
  ["demo-food-29", "Butter Noodles", "1760208018045-food_29.png", 14, "Noodles"],
  ["demo-food-30", "Veg Noodles", "1760208050615-food_30.png", 12, "Noodles"],
  ["demo-food-31", "Somen Noodles", "1760208093169-food_31.png", 20, "Noodles"],
  ["demo-food-32", "Cooked Noodles", "1761326729133-cooked_noodles.jpeg", 15, "Noodles"],
];

const restaurants = [
  ["demo-rest-delhi-01", "Punjabi Rasoi", "Delhi", "Connaught Place, Delhi", "North Indian, Pure Veg", 4.5, "1760206688542-food_1.png"],
  ["demo-rest-delhi-02", "Delhi Bowl House", "Delhi", "Saket, Delhi", "Rolls, Sandwich", 4.3, "1760206961010-food_5.png"],
  ["demo-rest-lucknow-01", "Biryani Ghar", "Lucknow", "Hazratganj, Lucknow", "Biryani, North Indian", 4.4, "1762610480732-best_simple_easy_chicken_dum_biryani.jpg"],
  ["demo-rest-jaipur-01", "Rajputana Haveli", "Jaipur", "MI Road, Jaipur", "Rajasthani, Pure Veg", 4.6, "1760207777136-food_23.png"],
  ["demo-rest-mumbai-01", "Mumbai Tawa Treats", "Mumbai", "Marine Drive, Mumbai", "Street Food, Sandwich", 4.3, "1760207338895-food_13.png"],
  ["demo-rest-hyderabad-01", "Hyderabadi Biryani House", "Hyderabad", "Banjara Hills, Hyderabad", "Biryani, Noodles", 4.6, "1762610528408-best_simple_easy_chicken_dum_biryani.jpg"],
  ["demo-rest-chennai-01", "Chennai Andhra Spice", "Chennai", "T Nagar, Chennai", "South Indian, Pure Veg", 4.4, "1760207815333-food_24.png"],
  ["demo-rest-kolkata-01", "Bengal Delight", "Kolkata", "Park Street, Kolkata", "Bengali, Cake", 4.5, "1760207521748-food_17.png"],
  ["demo-rest-chandigarh-01", "Cafe Chandigarh", "Chandigarh", "Sector 17, Chandigarh", "Modern Indian, Pasta", 4.5, "1760207855638-food_25.png"],
  ["demo-rest-pune-01", "Pune Pasta Co.", "Pune", "Koregaon Park, Pune", "Pasta, Salad", 4.2, "1760207948321-food_27.png"],
  ["demo-rest-bangalore-01", "Bangalore Garden Kitchen", "Bangalore", "Indiranagar, Bangalore", "Pure Veg, Salad", 4.4, "1760206740862-food_2.png"],
];

async function upsertFood(prisma, [id, name, image, price, category]) {
  return prisma.food.upsert({
    where: { id },
    update: { name, description, image, price, category },
    create: { id, name, description, image, price, category },
  });
}

async function upsertRestaurant(prisma, [id, name, city, address, cuisine, rating, image]) {
  return prisma.restaurant.upsert({
    where: { id },
    update: { name, city, address, cuisine, rating, image },
    create: { id, name, city, address, cuisine, rating, image },
  });
}

async function main() {
  const { prisma } = await import("../config/prisma.js");

  await Promise.all(foods.map((food) => upsertFood(prisma, food)));
  await Promise.all(restaurants.map((restaurant) => upsertRestaurant(prisma, restaurant)));

  const [foodCount, restaurantCount] = await Promise.all([
    prisma.food.count(),
    prisma.restaurant.count(),
  ]);

  console.log(`Seed complete: ${foodCount} foods, ${restaurantCount} restaurants.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    const { prisma } = await import("../config/prisma.js");
    await prisma.$disconnect();
  });
