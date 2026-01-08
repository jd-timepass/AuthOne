import express from 'express';
import { register, login, logout, jwtLogin } from './auth.controller.js';
import { authGuard } from '../middlewares/auth.guard.js';
import { roleGuard } from '../middlewares/role.guard.js';

const router = express.Router();

// Stateful authentication - SESSION BASED

router.post('/register', register);

router.post('/login', login);

router.get('/protected', authGuard, (req, res) => {
    res.json({
        message: 'You are authenticated',
        user: req.session.user
    });
});

router.post('/logout', logout);

router.get('/user', authGuard, roleGuard('user'), (req, res) => {
    res.status(200).json({ message: 'Welcome user!' });
});

router.get('/admin', authGuard, roleGuard('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome admin!' });
});

// Stateless authentication - JWT Based

router.post('/jwt/login', jwtLogin);

export default router;