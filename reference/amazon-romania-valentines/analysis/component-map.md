# Component Map: Amazon Romania Valentine's Storefront

## 1. Shell Components
- **Header**:
  - `Logo`: Amazon wordmark + smile arrow.
  - `DeliveryLocation`: Location pin + "Deliver to" + "Romania".
  - `DeliveryPopover`: Romania shipping notification ("items that ship to RO") with "Don't Change" and "Change Address" triggers.
  - `SearchBar`: Category selector ("All"), text input, and amber magnifying glass button.
  - `LanguageSelector`: US Flag + "EN".
  - `AccountMenu`: "Hello, sign in" / "Account & Lists" flyout.
  - `ReturnsOrders`: Direct link to customer orders.
  - `Cart`: Cart wireframe icon with count badge.

## 2. Navigation Components
- **SubNav**:
  - `AllMenuTrigger`: Hamburger menu button opening `SideDrawer`.
  - Links: "Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell".
  - Right link: "Shop deals in Electronics".
- **SideDrawer**:
  - Full slideout sidebar with departments and quick shortcuts.

## 3. Hero & Content Components
- **ValentineHero**:
  - High-resolution gift flat-lay image.
  - Centered typography: "Explore Valentine's Day" / "Shop deals".
  - Carousel control chevrons.
- **CardGrid (4 Columns)**:
  - `ShopByCategoryCard`: Quad grid (Computers & Accessories, Video Games, Baby, Toys & Games) + "Shop now".
  - `RefreshYourSpaceCard`: Quad grid (Dining, Home, Kitchen, Health and Beauty) + "See more".
  - `ElectronicsCard`: Single large flatlay card + "See more".
  - `SignInCard`: Top card with "Sign in securely" button.
  - `WorldwideShippingCard`: Cyan banner "We ship over 45 million products around the world" with Amazon boxes.

## 4. Below-the-fold Feed
- `DealsCarousel`: Today's Deals with discount percentage badges.
- `ProductRow`: Best sellers and recommended products in Electronics, Home, and Valentine's gifts.
- `Footer`: Back to top, 4 link columns, locale controls, copyright.
