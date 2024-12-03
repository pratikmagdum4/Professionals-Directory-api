import express from 'express';
import { registerProfessional, loginProfessional } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerProfessional);
router.post('/login', loginProfessional);

export default router;
