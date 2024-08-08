import mongoose from "mongoose";
import UserModel from "./user.model";
import mail from "@/utils/mail";

const Schema = mongoose.Schema;

const OrderItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less than 1"],
      max: [5, "Quantity maximum is 5"],
    },
  },
  {
    timestamps: true,
  }
);

const OrderSchema = new Schema(
  {
    grandTotal: {
      type: Number,
      required: true,
    },
    orderItems: [OrderItemSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.post("save", async function (doc, next) {
  try {
    const order = doc;
    const user = await UserModel.findById(order.createdBy);
    if (user) {
      const content = await mail.render("invoice.ejs", {
        customerName: user.fullName,
        contactEmail: "bagusdermawanmulya27@zohomail.com",
        orderItems: order.orderItems,
        grandTotal: order.grandTotal,
        year: "2024",
        companyName: "E-Commerce by Bagus Dermawan",
      });
      await mail.send({
        to: user.email,
        subject: "Order Confirmation",
        content,
      });
      next();
    }
  } catch (error) {
    console.error(error);
  }
});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
