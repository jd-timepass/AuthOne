import express from 'express';
import { register } from './auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.get('/test', (req, res) => {
    req.session.test = 'working';
    res.send(req.session);
});

export default router;