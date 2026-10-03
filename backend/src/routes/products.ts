import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

router.get('/products', (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, rating, prime, sort } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'All' && category !== 'all') {
      query += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      query += ' AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(brand) LIKE ?)';
      const term = `%${search.trim().toLowerCase()}%`;
      params.push(term, term, term);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(Number(maxPrice));
    }

    if (rating) {
      query += ' AND rating >= ?';
      params.push(Number(rating));
    }

    if (prime === 'true' || prime === '1') {
      query += ' AND is_prime = 1';
    }

    // Sorting
    if (sort === 'price_asc') {
      query += ' ORDER BY price ASC';
    } else if (sort === 'price_desc') {
      query += ' ORDER BY price DESC';
    } else if (sort === 'rating_desc') {
      query += ' ORDER BY rating DESC';
    } else if (sort === 'reviews_desc') {
      query += ' ORDER BY reviews_count DESC';
    } else {
      query += ' ORDER BY is_best_seller DESC, is_amazons_choice DESC, rating DESC';
    }

    const rows = db.prepare(query).all(...params) as any[];

    const products = rows.map((r) => ({
      ...r,
      is_prime: Boolean(r.is_prime),
      is_best_seller: Boolean(r.is_best_seller),
      is_amazons_choice: Boolean(r.is_amazons_choice),
      in_stock: Boolean(r.in_stock),
      images: JSON.parse(r.images_json || '[]'),
      features: JSON.parse(r.features_json || '[]'),
    }));

    return res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/products/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as any;

    if (!row) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const product = {
      ...row,
      is_prime: Boolean(row.is_prime),
      is_best_seller: Boolean(row.is_best_seller),
      is_amazons_choice: Boolean(row.is_amazons_choice),
      in_stock: Boolean(row.in_stock),
      images: JSON.parse(row.images_json || '[]'),
      features: JSON.parse(row.features_json || '[]'),
    };

    return res.json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/search', (req, res, next) => {
  try {
    const q = (req.query.q as string || '').trim().toLowerCase();

    if (!q) {
      return res.json({
        success: true,
        suggestions: ['Headphones', 'Laptops', 'Kindle', 'Air Fryer', 'Echo Show', 'Tumbler'],
        results: [],
      });
    }

    const rows = db.prepare(
      'SELECT id, title, category, price, main_image, rating FROM products WHERE LOWER(title) LIKE ? OR LOWER(category) LIKE ? LIMIT 6'
    ).all(`%${q}%`, `%${q}%`) as any[];

    // Extract relevant title snippets as suggestions
    const suggestions = Array.from(
      new Set(
        rows.map((r) => {
          const words = r.title.split(' ').slice(0, 4).join(' ');
          return words;
        })
      )
    );

    return res.json({
      success: true,
      query: q,
      suggestions,
      results: rows,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
