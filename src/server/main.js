import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import methodOverride from "method-override";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import Product from "./models/Product.js";
import ViteExpress from "vite-express";
import path from 'path';

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Middleware
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(methodOverride("_method"));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../../dist')));

// For all routes, serve the index.html file of the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// CORS setup
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], // list both frontend URLs
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`Method: ${req.method}, URL: ${req.url}`);
  next();
});

// MongoDB Connection
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/fresh-from-farm";
mongoose
  .connect(dbUrl)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// CRUD Routes
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.get("/api/products", async (req, res) => {
  try {
    const category = req.query.category;
    const products = category
      ? await Product.find({ category })
      : await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ _id: newProduct._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully", redirect: "/product/all" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
ViteExpress.listen(app, PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
