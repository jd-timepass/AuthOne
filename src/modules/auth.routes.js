import express from 'express';
import { register, login, logout } from './auth.controller.js';
import { authGuard } from '../middlewares/auth.guard.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login );
router.get('/protected', authGuard, (req, res) => {
    res.json({
        message: 'You are authenticated',
        user: req.session.user
    });
});
router.post('/logout', logout);

export default router;