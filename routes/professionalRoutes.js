import express from 'express';
import { getProfessionalsByCity } from '../controllers/professionalController.js';

const router = express.Router();

router.get('/', getProfessionalsByCity);

export default router;
