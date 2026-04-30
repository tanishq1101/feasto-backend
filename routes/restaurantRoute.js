import express from "express";
import { getRestaurantsByCity, getMenuByRestaurant, getRestaurantDetails} from "../controllers/restaurantController.js";
import restaurantModel from "../models/restaurantModel.js";

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
        restaurantModel.find().skip(skip).limit(limit),
        restaurantModel.countDocuments(),
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

    const restaurants = await restaurantModel.find();
    res.json({ success: true, restaurants });
  } catch {
    res.json({ success: false });
  }
});


export default router;
