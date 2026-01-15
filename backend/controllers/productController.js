import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'products',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, category, gender, price, sizes, colors, stock, material, status } = req.body;
    
    // Upload images to Cloudinary if provided
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      imageUrls = await Promise.all(uploadPromises);
    }
    
    // Parse sizes and colors if they're strings
    const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
    const parsedColors = typeof colors === 'string' ? JSON.parse(colors) : colors;

    const product = await Product.create({
      name,
      category,
      gender,
      price,
      sizes: parsedSizes,
      colors: parsedColors,
      stock,
      material,
      images: imageUrls,
      status: status || 'active',
      createdBy: req.admin.id
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Parse sizes and colors if they're strings
    if (updateData.sizes && typeof updateData.sizes === 'string') {
      updateData.sizes = JSON.parse(updateData.sizes);
    }
    if (updateData.colors && typeof updateData.colors === 'string') {
      updateData.colors = JSON.parse(updateData.colors);
    }

    // Handle images
    if (req.files && req.files.length > 0) {
      // New images uploaded - replace all images
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      const newImages = await Promise.all(uploadPromises);
      updateData.images = newImages;
    } else if (updateData.existingImages) {
      // Keep existing images
      updateData.images = JSON.parse(updateData.existingImages);
      delete updateData.existingImages;
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: error.message });
  }
};

// GET DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    const products = await Product.find();
    
    const totalProducts = products.length;
    const lowStockItems = products.filter(p => p.stock < 10).length;
    const categories = [...new Set(products.map(p => p.category))].length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    
    // Recent activity - last 5 products added
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name category price stock createdAt');

    res.json({
      totalProducts,
      lowStockItems,
      categories,
      totalValue,
      recentProducts
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: error.message });
  }
};
