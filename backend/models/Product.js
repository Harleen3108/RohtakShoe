import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // ✅ Product Name
  name: {
    type: String,
    required: true,
    trim: true
  },
  // ✅ Category (Formal, Casual, Sports, Sneakers, etc.)
  category: {
    type: String,
    required: true
  },
  // ✅ Gender (Men, Women, Unisex)
  gender: {
    type: String,
    enum: ["Men", "Women", "Unisex"],
    required: true
  },
  // ✅ Price
  price: {
    type: Number,
    required: true
  },
  // ✅ Sizes available (e.g. [6,7,8,9,10])
  sizes: {
    type: [Number],
    required: true
  },
  // ✅ Colors available (e.g. ["Black","Brown"])
  colors: {
    type: [String],
    required: true
  },
  // ✅ Total Stock
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  // ✅ Material details
  material: {
    type: String,
    required: true
  },
  // ✅ Images (multiple shoe images)
  images: {
    type: [String], // array of image URLs
    default: []
  },
  // ✅ Product Status
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  // Admin reference (who added product)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);
export default Product;
