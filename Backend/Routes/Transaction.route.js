import express from 'express';
const router = express.Router();
import { decode } from '../middlewares/jwt.js';
import { handleInvalidMethod } from '../middlewares/invalidrequest.js'
import transactionRoutes from '../Controllers/transaction.controller.js';

router.post('/new-transaction', decode, transactionRoutes.newTransaction)
router.put('/pick-transaction', decode, transactionRoutes.pickTransaction)
router.get('/transaction-listing', decode, transactionRoutes.transactionListing)
router.get('/single-transaction', decode, transactionRoutes.singleTransaction)
router.get('/recent-transactions',decode, transactionRoutes.recentTransactions)
router.patch('/patch-transaction',decode, transactionRoutes.patchTransaction)



// Apply the middleware for unsupported methods
router.all('/new-transaction', handleInvalidMethod);
router.all('/pick-transaction', handleInvalidMethod);
router.all('/transaction-listing', handleInvalidMethod);
router.all('/single-transaction', handleInvalidMethod);
router.all('/recent-transactions', handleInvalidMethod);
router.patch('/patch-transaction',decode, transactionRoutes.patchTransaction)


export default router
