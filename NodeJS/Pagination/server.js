import express from 'express';
import mongoose from 'mongoose';
import productsRouter from './routes/product.js';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/pagination-api', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
