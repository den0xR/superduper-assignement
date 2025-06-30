import express from 'express';
import BalanceController from '../controllers/balance-controller';
const router = express.Router();

router.post('/', BalanceController.getBalance);

export default router;
