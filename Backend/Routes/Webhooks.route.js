import express from 'express';
const router = express.Router();
import webhooksRoutes from '../Controllers/webhooks.controller.js';

router.get('/seller-order-placed', webhooksRoutes.transactionListing)

export default router

