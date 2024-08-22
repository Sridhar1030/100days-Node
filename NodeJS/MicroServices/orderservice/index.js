import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const orders = [
    { id: 1, userId: 1, productId: 2 },
    { id: 2, userId: 2, productId: 1 },
];

app.get('/orders', async (req, res) => {
    const fullOrders = await Promise.all(orders.map(async (order) => {
        const user = await axios.get(`http://localhost:3001/users/${order.userId}`);
        const product = await axios.get(`http://localhost:3002/products/${order.productId}`);
        return {
            id: order.id,
            user: user.data,
            product: product.data
        };
    }));

    res.json(fullOrders);
});

app.listen(3003, () => {
    console.log('Order Service running on port 3003');
});
