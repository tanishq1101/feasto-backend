import { prisma } from "../config/prisma.js";
import fs from "fs";
import path from "path";

// POST /api/food/add
const addFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields including image URL are required.",
      });
    }

    const food = await prisma.food.create({
      data: {
        name,
        description,
        price: Number(price),
        category,
        image,
      },
    });

    return res.json({ success: true, message: "Food Added Successfully", data: food });
  } catch (error) {
    console.error("Error adding food:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET /api/food/list
const listFood = async (req, res) => {
  try {
    const foods = await prisma.food.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("listFood error:", error);
    res.json({ success: false, message: "Error fetching food list" });
  }
};

// POST /api/food/remove
const removeFood = async (req, res) => {
  try {
    const food = await prisma.food.findUnique({ where: { id: req.body.id } });

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Only delete local files, not URL images
    if (food.image && !food.image.startsWith("http")) {
      const imagePath = path.join(process.cwd(), "uploads", food.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    await prisma.food.delete({ where: { id: req.body.id } });
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("removeFood error:", error);
    res.json({ success: false, message: "Error removing food" });
  }
};

// POST /api/food/update
const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category, image } = req.body;

    const food = await prisma.food.findUnique({ where: { id } });
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    const updated = await prisma.food.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: Number(price) }),
        ...(category && { category }),
        ...(image && { image }),
      },
    });

    res.json({ success: true, message: "Food updated successfully", data: updated });
  } catch (error) {
    console.error("updateFood error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addFood, listFood, removeFood, updateFood };
