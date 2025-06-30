import express from 'express';
const router = express.Router();
import ChainsController from '../controllers/chains-controller';

router.get('/', ChainsController.getChains);

export default router;
