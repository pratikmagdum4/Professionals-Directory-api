import express from 'express';
import { getProfessionalsByCity, getProfile, UpdateProfile } from '../controllers/professionalController.js';

const router = express.Router();

router.get('/', getProfessionalsByCity);
// router.get('/profile', getProfile);
// router.put('/profile', UpdateProfile);
export default router;
