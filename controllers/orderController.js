import { prisma } from "../config/prisma.js";
import "dotenv/config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL_PROD
    : process.env.FRONTEND_URL_LOCAL;

// -------------------- CREATE STRIPE CHECKOUT --------------------

const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/payment-failed`,
      metadata: {
        userId,
        address: JSON.stringify(address).slice(0, 499),
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res.json({ success: false, message: "Payment session failed" });
  }
};

// -------------------- SAVE ORDER AFTER PAYMENT --------------------

const saveOrderAfterPayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.json({ success: false, message: "No session ID provided" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      return res.json({ success: false, message: "Payment not completed" });
    }

    // Prevent duplicate orders
    const existingOrder = await prisma.order.findUnique({
      where: { stripeSessionId: session_id },
    });
    if (existingOrder) {
      return res.json({ success: true, order: existingOrder, message: "Order already saved" });
    }

    const userId = session.metadata.userId;
    const address = JSON.parse(session.metadata.address);
    const amount = session.amount_total / 100;

    const lineItems = await stripe.checkout.sessions.listLineItems(session_id);
    const items = lineItems.data.map((item) => ({
      name: item.description,
      price: item.amount_total / item.quantity / 100,
      quantity: item.quantity,
    }));

    // Ensure user exists in DB (Clerk user may not have synced yet)
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, email: "" },
    });

    const newOrder = await prisma.order.create({
      data: {
        userId,
        items,
        amount,
        address,
        payment: true,
        status: "Order Placed",
        stripeSessionId: session_id,
      },
    });

    // Clear cart
    await prisma.user.update({
      where: { id: userId },
      data: { cartData: {} },
    });

    return res.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Save order error:", error);
    return res.json({ success: false, message: "Failed to save order" });
  }
};

// -------------------- COD ORDER --------------------

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const newOrder = await prisma.order.create({
      data: {
        userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
        payment: false,
        status: "Pending",
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { cartData: {} },
    });

    res.json({
      success: true,
      message: "Order placed successfully (Cash on Delivery)",
      orderId: newOrder.id,
    });
  } catch (error) {
    console.error("placeOrder error:", error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// -------------------- VERIFY ORDER --------------------

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await prisma.order.update({
        where: { id: orderId },
        data: { payment: true, status: "Order Placed" },
      });
      res.json({ success: true, message: "Order marked as paid" });
    } else {
      await prisma.order.delete({ where: { id: orderId } });
      res.json({ success: true, message: "Order cancelled / not paid" });
    }
  } catch (error) {
    console.error("verifyOrder error:", error);
    res.json({ success: false, message: "Error verifying order" });
  }
};

// -------------------- USER ORDERS --------------------

const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("userOrders error:", error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

// -------------------- ADMIN --------------------

const listOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("listOrders error:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await prisma.order.update({ where: { id: orderId }, data: { status } });
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("updateStatus error:", error);
    res.json({ success: false, message: "Error updating order status" });
  }
};

const adminDeleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    await prisma.order.delete({ where: { id: orderId } });
    return res.status(200).json({ success: true, message: "Order deleted successfully by admin" });
  } catch (error) {
    console.error("adminDeleteOrder error:", error);
    return res.status(500).json({ success: false, message: "Server error deleting order (admin)" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.userId !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this order" });
    }

    await prisma.order.delete({ where: { id: orderId } });
    return res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("deleteOrder error:", error);
    return res.status(500).json({ success: false, message: "Server error deleting order" });
  }
};

export {
  createCheckoutSession,
  saveOrderAfterPayment,
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
  deleteOrder,
  adminDeleteOrder,
};
