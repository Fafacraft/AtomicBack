import { Router } from 'express';
import { atomController } from '../controllers/atom.controller.js';
import { atomCrud } from '../controllers/atomCrud.js';
import { checkServiceToken } from '../middlewares/serviceSecure.middleware.js';

const router = Router();

router.get('/stability', checkServiceToken, atomController.getStability);
router.post('/', checkServiceToken, atomCrud.createAtom);
router.get('/', checkServiceToken, atomCrud.getAtoms);
router.get('/:id', checkServiceToken, atomCrud.getAtomById);
router.get('/user/:userId', checkServiceToken, atomCrud.getAtomsByUser);
router.put('/:id', checkServiceToken, atomCrud.updateAtom);
router.delete('/:id', checkServiceToken, atomCrud.deleteAtom);


export default router;