import express from 'express';
import { register, login } from './auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login );
router.get('/protected', authGuard, (req, res) => {
    res.json({
        message: 'You are authenticated',
        user: req.session.user
    });
})

export default router;