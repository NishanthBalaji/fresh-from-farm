import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: String,
    imgUrl: String,
    category: String,
});

const Product = mongoose.model('Product', ProductSchema);

export default Product; // Use ES module default export