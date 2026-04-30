import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    payment: { type: Boolean, default: false },
    stripeSessionId: { type: String, default: null, index: true },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("orders", orderSchema);
export default orderModel;
