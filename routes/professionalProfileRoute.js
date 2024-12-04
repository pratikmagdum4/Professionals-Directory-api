import express from 'express';
import { getProfile, UpdateProfile } from '../controllers/professionalController.js';

const router = express.Router();
console.log("hi there ")
router.get('/profile/:id', getProfile);
router.put('/profile/:id', UpdateProfile);

export default router;
