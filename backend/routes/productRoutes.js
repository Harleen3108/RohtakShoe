import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getDashboardStats
} from "../controllers/productController.js";

const router = express.Router();

router.get("/dashboard/stats", protect, getDashboardStats);
router.post("/", protect, upload.array('images', 4), addProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.put("/:id", protect, upload.array('images', 4), updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
