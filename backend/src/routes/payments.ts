import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const paymentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  cardNumber: z.string().min(12, 'Card number too short').max(19),
  cardHolder: z.string().min(2, 'Name on card required'),
  expMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Invalid expiry month (MM)'),
  expYear: z.string().regex(/^\d{2,4}$/, 'Invalid expiry year (YY or YYYY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
});

router.post('/payments', (req, res, next) => {
  try {
    const data = paymentSchema.parse(req.body);

    // Simulate instant demo authorization
    const cleanCard = data.cardNumber.replace(/\s+/g, '');
    const last4 = cleanCard.slice(-4);
    const transactionId = 'txn_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 8).toUpperCase();

    return res.json({
      success: true,
      transactionId,
      status: 'APPROVED',
      amount: data.amount,
      currency: 'USD',
      last4,
      paymentMethod: `Visa ending in ${last4}`,
      message: 'Demo payment authorized successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
