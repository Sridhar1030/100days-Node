import express, { json } from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();

// Middleware
app.use(json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);

// Protected Route Example
app.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You are authenticated', user: req.user });
});

const PORT = process.env.PORT || 3000;
connect('mongodb://localhost:27017/jwt-best-practices', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('DB connection error:', error));
