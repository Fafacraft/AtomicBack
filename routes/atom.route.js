import { Router } from 'express';
import { atomController } from '../controllers/atom.controller.js';
import { checkServiceToken } from '../middlewares/serviceSecure.middleware.js';

const router = Router();

router.get('/stability', checkServiceToken, atomController.getStability);

export default router;