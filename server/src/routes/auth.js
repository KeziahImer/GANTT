const express = require('express');
const User = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

async function register(req, res, next) {
    const hash = await bcrypt.hash(req.body.password, 10)
    try {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        await user.save()
        try {
            res.status(201).json({ messsage: 'Utilisateur créé !'})
        } catch (error) {
            res.status(400).json({error})   
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

async function login(req, res, next) {
    const user = await User.findOne({ email: req.body.email })
    if (user === null) {
        res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect !' })
    } else {
        const valid = await bcrypt.compare(req.body.password, user.password)
        try {
            if (!valid) {
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect !' });
            } else {
                res.status(200).json({ userId: user._id, token: jwt.sign({ userId: user._id }, 'RANDOM_SECRET_TOKEN', { expiresIn: '24h' }) });
            }
        } catch (error) {
            res.status(500).json({ error })
        }
    }
};

router.post('/register', register);
router.post('/login', login);

module.exports = router;
