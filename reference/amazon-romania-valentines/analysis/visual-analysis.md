# Visual Analysis: Amazon Romania Valentine's Day Storefront

## 1. Viewport & Dimensions
- **Reference Screenshot Dimensions**: 1536px × 808px (Aspect ratio ~1.90:1)
- **Top Header Height**: 60px (`#131921`)
- **Secondary Navigation Height**: 39px (`#232f3e`)
- **Combined Header Height**: 99px
- **Hero Section Height**: ~360px (underlying banner extends behind overlapping cards)
- **Card Overlap Offset**: Cards overlap hero by ~110px
- **Container Max-Width**: ~1480px, centered with 20px side margins

## 2. Page Sections
1. **Header**:
   - Left: Amazon brand logo (White text with orange arrow smile).
   - Delivery Location: Map pin icon, "Deliver to" (12px grey `#ccc`), "Romania" (14px bold white `#fff`).
   - Center Search Bar:
     - Department Selector dropdown: "All ▾" with grey background `#e6e6e6`.
     - Text Input: "Search Amazon" placeholder.
     - Search Button: Amber `#febd69` (hover `#f3a847`) with black magnifying glass.
   - Right Utility Nav:
     - Language: 🇺🇸 flag + "EN ▾"
     - Account: "Hello, sign in" (12px grey) / "Account & Lists ▾" (14px bold white)
     - Orders: "Returns" (12px grey) / "& Orders" (14px bold white)
     - Cart: Wireframe cart icon with yellow badge "0" + "Cart" text
2. **Secondary Navigation Bar**:
   - Background: `#232f3e`, height 39px.
   - Left: "☰ All", "Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell".
   - Right: "Shop deals in Electronics".
3. **Romania Delivery Popover**:
   - Location: Positioned directly underneath "Deliver to Romania", top arrow pointer.
   - Background: Pure white `#ffffff`, subtle shadow `0 4px 16px rgba(0,0,0,0.2)`.
   - Text: "We're showing you items that ship to RO. To see items that ship to a different country, change your delivery address."
   - Action Buttons:
     - Left: "Don't Change" (white button, `#d5d9d9` border).
     - Right: "Change Address" (Amazon gold `#ffd814`, rounded).
4. **Valentine's Day Hero Banner**:
   - Imagery: Flat-lay photo of Valentine's gift boxes in blush pink and rich crimson, satin ribbons, gold scissors, fresh pink roses, love note cards with red paper hearts.
   - Text:
     - "Explore Valentine's Day" (Bold, 34px, dark slate `#0f1111`).
     - "Shop deals" (Medium, 22px, `#0f1111`).
   - Navigation: Left chevron arrow (`<`) and right chevron arrow (`>`).
5. **4-Column Content Layout (Grid Cards)**:
   - **Column 1: "Shop by Category"**
     - 4-item quad grid with captions:
       * Computers & Accessories (Acer Predator gaming laptop)
       * Video Games (PlayStation 4 console & controller)
       * Baby (Baby monitor)
       * Toys & Games (L.O.L. Surprise! ball)
     - Link: "Shop now" (`#007185`).
   - **Column 2: "Refresh your space"**
     - 4-item quad grid with captions:
       * Dining (Glass decanter & dining table)
       * Home (Folded textiles & cushions)
       * Kitchen (Charcuterie and cheese board)
       * Health and Beauty (Lotion / soap bottle)
     - Link: "See more" (`#007185`).
   - **Column 3: "Electronics"**
     - Single large featured image: Flat-lay with black laptop, mint green Instax camera, photo prints, blue headphones.
     - Link: "See more" (`#007185`).
   - **Column 4: Dual Stacked Cards**
     - Top Box (White card):
       * Title: "Sign in for the best experience"
       * Button: "Sign in securely" (Full width yellow `#ffd814` button).
     - Bottom Box (Vibrant Cyan `#00a8e1`):
       * Title: "We ship over 45 million products around the world" (Centered, white bold).
       * Graphic: 3 floating Amazon Prime cardboard boxes with Amazon smile logo.
