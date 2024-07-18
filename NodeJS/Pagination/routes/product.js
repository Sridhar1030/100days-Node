import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const products = await Product.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Product.countDocuments();

        res.json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
