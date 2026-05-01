import express from "express";
import { getRestaurantsByCity, getMenuByRestaurant, getRestaurantDetails} from "../controllers/restaurantController.js";
import { prisma } from "../config/prisma.js";

const router = express.Router();

// /api/restaurant/city/Delhi
router.get("/city/:city", getRestaurantsByCity);

// /api/restaurant/64f2ab.../menu
router.get("/:id/menu", getMenuByRestaurant);

router.get("/details/:id", getRestaurantDetails);

router.get("/all", async (req, res) => {
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
        restaurants,
        meta: {
          page,
          limit,
          total,
          hasNextPage: skip + restaurants.length < total,
        },
      });
    }

    const restaurants = await prisma.restaurant.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ success: true, restaurants });
  } catch (error) {
    console.error("list all restaurants error:", error);
    res.json({ success: false, message: "Error loading restaurants" });
  }
});


export default router;
