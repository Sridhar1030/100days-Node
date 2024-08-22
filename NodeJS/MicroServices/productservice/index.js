import express from 'express';

const app = express();
app.use(express.json());

const products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

app.listen(3002, () => {
    console.log('Product Service running on port 3002');
});
