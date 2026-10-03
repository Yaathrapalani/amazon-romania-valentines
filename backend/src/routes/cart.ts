import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db.js';
import { optionalAuthMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1).default(1),
});

const updateCartSchema = z.object({
  quantity: z.number().int().min(0),
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

router.get('/cart', optionalAuthMiddleware, (req: AuthRequest, res, next) => {
  try {
    const userId = getUserId(req);

    const rows = db.prepare(`
      SELECT 
        ci.id as cart_item_id,
        ci.quantity,
        p.id,
        p.title,
        p.brand,
        p.category,
        p.price,
        p.list_price,
        p.rating,
        p.reviews_count,
        p.is_prime,
        p.in_stock,
        p.main_image
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `).all(userId) as any[];

    const items = rows.map((r) => ({
      cartItemId: r.cart_item_id,
      quantity: r.quantity,
      product: {
        id: r.id,
        title: r.title,
        brand: r.brand,
        category: r.category,
        price: r.price,
        list_price: r.list_price,
        rating: r.rating,
        reviews_count: r.reviews_count,
        is_prime: Boolean(r.is_prime),
        in_stock: Boolean(r.in_stock),
        main_image: r.main_image,
      },
    }));

    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    return res.json({
      success: true,
      items,
      subtotal: Math.round(subtotal * 100) / 100,
      totalQuantity,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/cart', optionalAuthMiddleware, (req: AuthRequest, res, next) => {
  try {
    const userId = getUserId(req);
    const { productId, quantity } = addToCartSchema.parse(req.body);

    const product = db.prepare('SELECT id FROM products WHERE id = ?').get(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const existing = db.prepare('SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?').get(userId, productId) as any;

    if (existing) {
      const newQty = existing.quantity + quantity;
      db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(newQty, existing.id);
    } else {
      const cartItemId = 'cart_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      db.prepare('INSERT INTO cart_items (id, user_id, product_id, quantity) VALUES (?, ?, ?, ?)').run(
        cartItemId,
        userId,
        productId,
        quantity
      );
    }

    return res.json({ success: true, message: 'Item added to cart' });
  } catch (err) {
    next(err);
  }
});

router.put('/cart/:id', optionalAuthMiddleware, (req: AuthRequest, res, next) => {
  try {
    const userId = String(getUserId(req));
    const id = String(req.params.id);
    const { quantity } = updateCartSchema.parse(req.body);

    if (quantity <= 0) {
      db.prepare('DELETE FROM cart_items WHERE id = ? AND user_id = ?').run(id, userId);
      return res.json({ success: true, message: 'Item removed from cart' });
    }

    const result = db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?').run(quantity, id, userId);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    return res.json({ success: true, message: 'Cart updated' });
  } catch (err) {
    next(err);
  }
});

router.delete('/cart/:id', optionalAuthMiddleware, (req: AuthRequest, res, next) => {
  try {
    const userId = String(getUserId(req));
    const id = String(req.params.id);

    db.prepare('DELETE FROM cart_items WHERE id = ? AND user_id = ?').run(id, userId);
    return res.json({ success: true, message: 'Item removed from cart' });
  } catch (err) {
    next(err);
  }
});

router.delete('/cart', optionalAuthMiddleware, (req: AuthRequest, res, next) => {
  try {
    const userId = getUserId(req);
    db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(userId);
    return res.json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    next(err);
  }
});

export default router;
