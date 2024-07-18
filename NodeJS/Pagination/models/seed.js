import mongoose from 'mongoose';
import Product from '../models/product.js';

mongoose.connect('mongodb://localhost:27017/pagination-api', { useNewUrlParser: true, useUnifiedTopology: true });

const seedProducts = async () => {
    await Product.deleteMany({});
    for (let i = 1; i <= 100; i++) {
        await Product.create({ name: `Product ${i}`, price: i * 10 });
    }
    mongoose.connection.close();
};

seedProducts();
