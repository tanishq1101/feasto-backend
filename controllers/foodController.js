import Food from "../models/foodModel.js";
import fs from "fs";
import path from "path";

/** POST /api/food/add
 * Body: JSON with fields: name, description, price, category, image (URL string)
 */

const addFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields including image URL are required.",
      });
    }

    const food = new Food({
      name,
      description,
      price: Number(price),
      category,
      image,
    });

    await food.save();

    return res.json({ success: true, message: "Food Added Successfully", data: food });
  } catch (error) {
    console.error("Error adding food:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Only delete file if it's a local file path (NOT a URL)
    if (food.image && !food.image.startsWith("http")) {
      const imagePath = path.join(process.cwd(), "uploads", food.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    } else {
      console.log("Skipping image delete (URL image).");
    }

    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error in removeFood:", error);
    res.json({ success: false, message: "Error" });
  }
};

// update food item
const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category, image } = req.body;

    const food = await Food.findById(id);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    if (name) food.name = name;
    if (description) food.description = description;
    if (price) food.price = Number(price);
    if (category) food.category = category;
    if (image) food.image = image;

    await food.save();
    res.json({ success: true, message: "Food updated successfully", data: food });

  } catch (error) {
    console.error("Error in updateFood:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { addFood, listFood, removeFood, updateFood };
