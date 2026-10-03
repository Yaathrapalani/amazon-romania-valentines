# Interaction Map: Amazon Romania Storefront

## User Journeys & State Transitions

1. **Romania Delivery Popover Interaction**:
   - Initial State: Popover displayed below "Deliver to Romania".
   - `Don't Change`: Dismisses popover.
   - `Change Address`: Navigates to address management/checkout flow.

2. **Search & Auto-Suggest Interaction**:
   - Typing in Search Bar queries `/api/search?q=...` with instant dropdown suggestions.
   - Submitting enters `/search?q=...&category=...`.

3. **Category Card Click**:
   - Clicking any quad item navigates to `/search?category=...`.

4. **Commerce Path**:
   - `Home` → `Search` → `Product` → `Add to Cart` (badge increments) → `Cart` → `Checkout` → `Demo Payment` (instant verification) → `Order Placed` (`#114-XXXXXXX-XXXXXXX`) → `Your Orders` (persisted in SQLite).

5. **Authentication & Session**:
   - Toggle between Sign In & Create Account.
   - Quick "⚡ Use Demo Account" auto-fills `demo@amazon.com` / `amazon123`.
   - JWT & HTTP-only cookies authenticate user requests.
