import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db.js';
import { optionalAuthMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

function generateAmazonOrderId(): string {
  const p1 = Math.floor(100 + Math.random() * 900);
  const p2 = Math.floor(1000000 + Math.random() * 9000000);
  const p3 = Math.floor(1000000 + Math.random() * 9000000);
  return `${p1}-${p2}-${p3}`;
}

const createOrderSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    streetAddress: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    phoneNumber: z.string().optional(),
  }),
  paymentMethod: z.string().default('Credit Card (Demo)'),
  items: z.array(
    z.object({
      productId: z.string(),
      title: z.string(),
      price: z.number(),
      quantity: z.number(),
      image: z.string(),
    })
  ).min(1, 'At least one item is required'),
  totalAmount: z.number().positive(),
});

function getUserId(req: AuthRequest): string {
  if (req.user?.id) {
    return req.user.id;
  }
  let guestId = req.cookies?.guest_id || req.headers['x-guest-id'];
  if (!guestId || typeof guestId !== 'string') {
    guestId = 'guest_default';
  }
  return guestId;
}

router.get('/orders', optionalAuthMiddleware, (req: AuthRequest, res, next) => {
  try {
    const userId = getUserId(req);

    const rows = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(userId) as any[];

    const orders = rows.map((r) => ({
      id: r.id,
      userId: r.user_id,
      totalAmount: r.total_amount,
      status: r.status,
      shippingAddress: JSON.parse(r.shipping_address_json || '{}'),
      paymentMethod: r.payment_method,
      items: JSON.parse(r.items_json || '[]'),
      createdAt: r.created_at,
    }));

    return res.json({
      success: true,
      orders,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/orders/:id', optionalAuthMiddleware, (req: AuthRequest, res, next) => {
  try {
    const id = String(req.params.id);
    const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any;

    if (!row) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const order = {
      id: row.id,
      userId: row.user_id,
      totalAmount: row.total_amount,
      status: row.status,
      shippingAddress: JSON.parse(row.shipping_address_json || '{}'),
      paymentMethod: row.payment_method,
      items: JSON.parse(row.items_json || '[]'),
      createdAt: row.created_at,
    };

    return res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/orders', optionalAuthMiddleware, (req: AuthRequest, res, next) => {
  try {
    const userId = getUserId(req);
    const data = createOrderSchema.parse(req.body);

    const orderId = generateAmazonOrderId();

    db.prepare(`
      INSERT INTO orders (id, user_id, total_amount, status, shipping_address_json, payment_method, items_json)
      VALUES (?, ?, ?, 'Confirmed', ?, ?, ?)
    `).run(
      orderId,
      userId,
      data.totalAmount,
      JSON.stringify(data.shippingAddress),
      data.paymentMethod,
      JSON.stringify(data.items)
    );

    // Clear cart for this user
    db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(userId);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId,
      order: {
        id: orderId,
        userId,
        totalAmount: data.totalAmount,
        status: 'Confirmed',
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
        items: data.items,
        estimatedDelivery: 'Tomorrow, by 8:00 PM',
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
