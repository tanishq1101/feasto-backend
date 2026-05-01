import { prisma } from "../config/prisma.js";

// Get Restaurants by City
export const getRestaurantsByCity = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { city: req.params.city },
    });
    res.json({ success: true, restaurants });
  } catch (error) {
    console.error("getRestaurantsByCity error:", error);
    res.json({ success: false, message: "Error loading restaurants" });
  }
};

// Get Menu of Restaurant (food items for a restaurant by category match)
export const getMenuByRestaurant = async (req, res) => {
  try {
    // In the new schema Food doesn't have restaurantId — return all foods as fallback
    const menu = await prisma.food.findMany();
    res.json({ success: true, menu });
  } catch (error) {
    console.error("getMenuByRestaurant error:", error);
    res.json({ success: false, message: "Error loading menu" });
  }
};

// Get restaurant details
export const getRestaurantDetails = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: req.params.id },
    });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }
    res.json({ success: true, restaurant });
  } catch (error) {
    console.error("getRestaurantDetails error:", error);
    res.json({ success: false, message: "Error loading restaurant details" });
  }
};

// Admin: List restaurants (with optional pagination)
export const listRestaurants = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page ?? "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit ?? "0", 10), 0);

    if (limit > 0) {
      const skip = (page - 1) * limit;
      const [restaurants, total] = await Promise.all([
        prisma.restaurant.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
        prisma.restaurant.count(),
      ]);
      return res.json({
        success: true,
        data: restaurants,
        meta: {
          page,
          limit,
          total,
          hasNextPage: skip + restaurants.length < total,
        },
      });
    }

    const restaurants = await prisma.restaurant.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error("listRestaurants error:", error);
    res.json({ success: false, message: "Error loading restaurants" });
  }
};

// Admin: Add restaurant
export const addRestaurant = async (req, res) => {
  try {
    const { name, city, address, cuisine, rating, image } = req.body;
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        city,
        address,
        cuisine,
        rating: Number(rating),
        image: image || null,
      },
    });
    res.json({ success: true, message: "Restaurant Added", data: restaurant });
  } catch (err) {
    console.error("addRestaurant error:", err);
    res.json({ success: false, message: "Failed to add restaurant" });
  }
};

// Admin: Delete restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    await prisma.restaurant.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Restaurant deleted" });
  } catch (err) {
    console.error("deleteRestaurant error:", err);
    res.json({ success: false, message: "Failed to delete restaurant" });
  }
};
