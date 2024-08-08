import { Request, Response } from "express";
import mongoose from "mongoose";
import * as Yup from "yup";
import OrderModel from "@/models/order.model";
import { IReqUser } from "@/utils/interfaces";
import ProductsModel from "@/models/products.model";

const orderItemSchema = Yup.object().shape({
  name: Yup.string().required(),
  productId: Yup.string()
    .required()
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
  price: Yup.string().required(),
  quantity: Yup.number().required().min(1).max(5),
});

const orderSchema = Yup.object().shape({
  grandTotal: Yup.number().required(),
  orderItems: Yup.array().of(orderItemSchema).required(),
  createdBy: Yup.string().required(),
  status: Yup.string().required().oneOf(["pending", "completed", "canceled"]),
});

interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

export default {
  async create(req: Request, res: Response) {
    try {
      req.body.createdBy = (req as IReqUser).user.id;
      await orderSchema.validate(req.body);
      for (const productItem of req.body.orderItems) {
        const product = await ProductsModel.findById(productItem.productId);
        if (!product) {
          return res.status(404).json({
            data: null,
            message: `Product with ID :${productItem.productId} is not found`,
          });
        }
        if (product.qty < productItem.quantity) {
          return res.status(400).json({
            data: null,
            message: `Product with ID :${productItem.productId} is out of stock`,
          });
        }
        product.qty -= productItem.quantity;
        await product.save();
      }
      const result = await OrderModel.create(req.body);
      res.status(201).json({
        data: result,
        message: "Order created successfully",
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({
          data: null,
          message: "Failed create order (Validate Error)",
        });
      }
      const err = error as Error;
      return res.status(500).json({
        data: err.message,
        message: "Failed create order",
      });
    }
  },
  async findAll(req: Request, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search = "",
      } = req.query as unknown as IPaginationQuery;

      const userId = (req as IReqUser).user.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const query: any = { createdBy: userId };
      if (search) {
        Object.assign(query, {
          name: { $regex: search, $options: "i" },
        });
      }
      const result = await OrderModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .populate("createdBy");
      const total = await OrderModel.countDocuments(query);
      res.status(200).json({
        data: result,
        message: "Success get all order",
        page: +page,
        limit: +limit,
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all orders",
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          data: "null",
          message: "Failed get product",
        });
      }
      const result = await OrderModel.findById(id);
      if (!result) {
        return res.status(404).json({
          data: "null",
          message: "Failed get result",
        });
      }
      res.status(200).json({
        data: result,
        message: "Success get one product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one product",
      });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const result = await OrderModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        data: result,
        message: "Success update product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed update product",
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id);
      if (!order) {
        return res.status(404).json({
          data: null,
          message: "Order item not found",
        });
      }
      await OrderModel.findByIdAndDelete(id);
      res.status(200).json({
        data: null,
        message: "Success delete order item",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed delete order item",
      });
    }
  },
};
