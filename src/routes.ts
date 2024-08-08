import express from "express";

import uploadMiddleware from "./middlewares/upload.middleware";
import uploadController from "./controllers/upload.controller";
import productsController from "./controllers/products.controller";
import categoriesController from "./controllers/categories.controller";
import authMiddleware from "./middlewares/auth.middleware";
import authController from "./controllers/auth.controller";
import aclMiddleware from "./middlewares/acl.middleware";
import orderController from "./controllers/order.controller";

const router = express.Router();

// routes category controller
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

// routes product controller
router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

// routes authentication
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get(
  "/auth/me/",
  [authMiddleware, aclMiddleware(["admin"])],
  authController.me
);
router.put("/auth/profile", authMiddleware, authController.profile);

// routes order controller
router.get("/orders/:id", authMiddleware, orderController.findOne);
router.get("/orders", authMiddleware, orderController.findAll);
router.post("/orders", authMiddleware, orderController.create);
router.delete("/orders/:id", authMiddleware, orderController.delete);
router.put("/orders/:id", authMiddleware, orderController.update);

export default router;
