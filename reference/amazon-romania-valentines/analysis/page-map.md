# Page Map: Amazon Romania Valentine's Storefront Ecosystem

## 1. Primary Landing Page
- **Route**: `/` (Home)
- **Hero State**: Valentine's Day Promotional Hero Banner (`Explore Valentine's Day / Shop deals`)
- **Grid Layout**: 4 columns (Shop by Category, Refresh your space, Electronics, Sign-in & Worldwide Shipping)
- **Below-the-Fold Feed**: Today's Deals, Best Sellers in Electronics & Tech, Popular Home & Books, Complete Amazon Romania Footer

## 2. Connected Storefront Pages
- **Route**: `/search`
  - Purpose: Product search results & category browsing
  - Filter Facets: Department categories, Customer review ratings (4★ & Up), Price ranges, Prime eligible toggle
  - Sorting: Featured, Price: Low to High, Price: High to Low, Avg Customer Review, Most Reviews
- **Route**: `/product/:id`
  - Purpose: Full Amazon Product Detail Page (PDP)
  - Features: Thumbnail gallery switcher, Prime delivery calculation, Amazon Buy Box, Add to Cart, Buy Now
- **Route**: `/cart`
  - Purpose: Shopping Cart with subtotal calculation, quantity adjustment, item removal, gift options
- **Route**: `/checkout`
  - Purpose: Multi-step checkout with Romania shipping address, Demo card payment, delivery speed selection, order summary
- **Route**: `/order-success/:id`
  - Purpose: Confirmation page with generated Amazon Order ID and estimated delivery date
- **Route**: `/orders`
  - Purpose: Your Orders management, past order history, package tracking, Buy It Again
- **Route**: `/auth`
  - Purpose: Sign-in / Account registration with 1-click Demo auto-fill
