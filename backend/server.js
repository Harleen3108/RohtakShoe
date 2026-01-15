import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration - Allow all origins for now
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Health check route - MUST be before other routes
app.get("/", (req, res) => {
  res.json({ 
    message: "ProductHub API is running",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy",
    database: "connected"
  });
});

// API base route for testing
app.get("/api", (req, res) => {
  res.json({ 
    message: "API is working",
    endpoints: {
      admin: "/api/admin/login",
      products: "/api/products"
    }
  });
});

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: "Route not found",
    path: req.path 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
});
