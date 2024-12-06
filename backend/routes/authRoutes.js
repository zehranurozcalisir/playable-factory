const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.', user: newUser });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Kullanıcı adı veya e-posta zaten mevcut.' });
        } else {
            res.status(500).json({ message: 'Bir hata oluştu.', error });
        }
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Geçersiz şifre.' });
        }

        //Create Token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Giriş başarılı.',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu.', error });
    }
});

module.exports = router;
