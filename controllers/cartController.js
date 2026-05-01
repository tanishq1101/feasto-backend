import { prisma } from "../config/prisma.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    const userData = await prisma.user.findUnique({ where: { id: userId } });
    const cartData = (userData?.cartData ?? {});

    const updatedCart = {
      ...cartData,
      [itemId]: ((cartData[itemId] ?? 0) + 1),
    };

    await prisma.user.update({
      where: { id: userId },
      data: { cartData: updatedCart },
    });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error("addToCart error:", error);
    res.json({ success: false, message: "Error updating cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    const userData = await prisma.user.findUnique({ where: { id: userId } });
    const cartData = { ...(userData?.cartData ?? {}) };

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
    }

    await prisma.user.update({
      where: { id: userId },
      data: { cartData },
    });

    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.error("removeFromCart error:", error);
    res.json({ success: false, message: "Error updating cart" });
  }
};

// Fetch cart data
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await prisma.user.findUnique({ where: { id: userId } });
    const cartData = userData?.cartData ?? {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("getCart error:", error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
