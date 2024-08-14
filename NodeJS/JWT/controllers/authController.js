// authController.js

import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { jwtSecret, jwtExpiry } from "../config/config.js";
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
const { compare, hash } = bcrypt;

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = sign({ userId: user.id }, jwtSecret, { expiresIn: jwtExpiry });
        res.cookie('token', token, { httpOnly: true, secure: true });
        return res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
