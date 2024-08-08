import { Request, Response } from "express";
import CategoriesModel from "@/models/category.model";
import mongoose from "mongoose";

export default {
  async create(req: Request, res: Response) {
    try {
      const result = await CategoriesModel.create(req.body);
      res.status(201).json({
        data: result,
        message: "Success create category",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create category",
      });
    }
  },
  async findAll(req: Request, res: Response) {
    try {
      const result = await CategoriesModel.find();
      res.status(200).json({
        data: result,
        message: "Success get all category",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all category",
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
      const result = await CategoriesModel.findById(id).populate("products");
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
      const result = await CategoriesModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        data: result,
        message: "Success update category",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed update category",
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const result = await CategoriesModel.findOneAndDelete({
        _id: req.params.id,
      });

      res.status(200).json({
        data: result,
        message: "Success delete product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed delete product",
      });
    }
  },
};
