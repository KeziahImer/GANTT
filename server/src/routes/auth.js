import { Router } from 'express';
import User from '../models/auth.js';
import { hash as _hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res, next) => {
    const hash = await _hash(req.body.password, 10)
    try {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        try {
            await user.save()
            res.status(201).json({ messsage: 'Utilisateur créé !'})
        } catch (error) {
            res.status(400).json({error})   
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (user === null) {
        res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect !' })
    } else {
        const valid = await compare(req.body.password, user.password)
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

const profileUpdate = async (req, res, next) => {
    const user = await User.findOne({ _id: req.body.id })
    if (user === null) {
        res.status(401).json({ message: 'Compte inexistant' })
    } else {
        const hash = await _hash(req.body.password, 10)
        await User.updateOne({_id: user._id},{ password: hash })
        res.status(201).json({ message: 'Mot de passe modifié !' })
    }
}

const profileDelete = async (req, res, next) => {
    await User.deleteOne({_id: req.params.id})
    res.status(201).json({ message: 'Compte supprimé !' })
}

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/profile', profileUpdate);
router.delete('/profile/:id', profileDelete)

export default router;
