import type { Product } from '../types';

export const products = [
    {
      id: 'prod_1',
      title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones with Auto NC Optimizer, Crystal Clear Hands-Free Calling - Black',
      brand: 'Sony',
      category: 'Electronics',
      description: 'Industry-leading noise canceling with two processors and eight microphones. Magnificent sound quality, engineered to perfection with the new Integrated Processor V1. Crystal clear hands-free calling with 4 beamforming microphones, precise voice pickup, and advanced audio signal processing.',
      price: 348.00,
      list_price: 399.99,
      rating: 4.6,
      reviews_count: 14820,
      is_prime: 1,
      is_best_seller: 1,
      is_amazons_choice: 0,
      in_stock: 1,
      stock_count: 32,
      main_image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
      ],
      features: [
        'Industry Leading Noise Cancellation with 2 processors and 8 microphones',
        'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)',
        'Ultra-comfortable, lightweight design with soft fit leather',
        'Multipoint connection allows you to quickly switch between devices',
        'Intuitive touch control settings to pause, play, skip tracks, and control volume'
      ],
      badge: '#1 Best Seller in Over-Ear Headphones'
    },
    {
      id: 'prod_2',
      title: 'Apple AirPods Pro 2 Wireless Earbuds, Active Noise Cancellation, Hearing Aid Feature, Bluetooth Headphones, Transparency Mode',
      brand: 'Apple',
      category: 'Electronics',
      description: 'AirPods Pro 2 feature pro-level Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking for immersive sound.',
      price: 189.99,
      list_price: 249.00,
      rating: 4.8,
      reviews_count: 48930,
      is_prime: 1,
      is_best_seller: 0,
      is_amazons_choice: 1,
      in_stock: 1,
      stock_count: 120,
      main_image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80',
        'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80'
      ],
      features: [
        'Next-level Active Noise Cancellation reduces up to 2x more unwanted noise',
        'Personalized Spatial Audio with dynamic head tracking',
        'Up to 6 hours of listening time with ANC enabled, and up to 30 hours total with MagSafe Charging Case',
        'Dust, sweat, and water resistant (IP54) for AirPods and case',
        'Intuitive touch control lets you manage volume by swiping the stem'
      ],
      badge: "Amazon's Choice in Earbud Headphones"
    },
    {
      id: 'prod_3',
      title: 'Apple 2024 MacBook Air 15-inch Laptop with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 16GB Unified Memory, 512GB SSD',
      brand: 'Apple',
      category: 'Computers & Accessories',
      description: 'LEAN. MEAN. M3 MACHINE — The blazing-fast MacBook Air with the M3 chip is a superportable laptop that sails through work and play.',
      price: 1349.00,
      list_price: 1499.00,
      rating: 4.9,
      reviews_count: 3210,
      is_prime: 1,
      is_best_seller: 1,
      is_amazons_choice: 0,
      in_stock: 1,
      stock_count: 14,
      main_image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'
      ],
      features: [
        'Powerful Apple M3 8-core CPU and 10-core GPU',
        'Up to 18 hours of battery life to keep you moving throughout the day',
        'Stunning 15.3-inch Liquid Retina display supports 1 billion colors',
        'MagSafe 3 charging port, two Thunderbolt ports, headphone jack, Wi-Fi 6E',
        '1080p FaceTime HD camera, three-mic array, six-speaker sound system with Spatial Audio'
      ],
      badge: '#1 Best Seller in Traditional Laptops'
    },
    {
      id: 'prod_4',
      title: 'Logitech MX Master 3S Wireless Performance Mouse, Quiet Clicks, 8K DPI Sensor, Ultra-Fast Scrolling, Bluetooth, USB-C - Graphite',
      brand: 'Logitech',
      category: 'Computers & Accessories',
      description: 'An icon remastered: Logitech MX Master 3S wireless computer mouse is reimagined for ultimate tactility, performance, and flow.',
      price: 89.99,
      list_price: 99.99,
      rating: 4.7,
      reviews_count: 22400,
      is_prime: 1,
      is_best_seller: 0,
      is_amazons_choice: 1,
      in_stock: 1,
      stock_count: 45,
      main_image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80'
      ],
      features: [
        'Quiet Clicks: delivers satisfying, soft tactile feel with 90% less click noise',
        '8K DPI any-surface tracking: tracks on virtually any surface, even glass',
        'MagSpeed electromagnetic scrolling: scrolls 1,000 lines per second with precision',
        'Ergonomic silhouette crafted to support your palm and fingers',
        'Customizable in Logi Options+ software on Windows and macOS'
      ],
      badge: "Amazon's Choice in Computer Mice"
    },
    {
      id: 'prod_5',
      title: 'Echo Show 8 (3rd Gen, 2024 release) | HD smart display with spatial audio, smart home hub, and 13 MP camera - Charcoal',
      brand: 'Amazon',
      category: 'Smart Home',
      description: 'Better inside and out — Entertainment is more immersive with spatial audio and an 8-inch HD touchscreen. Video calling is clearer with centered, auto-framing camera and noise reduction.',
      price: 104.99,
      list_price: 149.99,
      rating: 4.6,
      reviews_count: 8750,
      is_prime: 1,
      is_best_seller: 1,
      is_amazons_choice: 0,
      in_stock: 1,
      stock_count: 80,
      main_image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80'
      ],
      features: [
        'Rich spatial audio delivers room-filling clarity and deep bass',
        'Built-in smart home hub compatible with Zigbee, Matter, and Thread',
        'Centering 13MP auto-framing camera for crisp, smooth family calls',
        'Vibrant 8-inch HD touch display adjusts color and brightness dynamically',
        'Privacy protections including a built-in camera shutter and microphone off button'
      ],
      badge: 'Limited time deal'
    },
    {
      id: 'prod_6',
      title: 'Ninja AF101 Air Fryer that Crisps, Roasts, Reheats, & Dehydrates, for Quick, Easy Meals, 4 Quart Capacity, High Gloss Finish - Grey',
      brand: 'Ninja',
      category: 'Home & Kitchen',
      description: 'Now enjoy guilt-free food. Air fry with up to 75% less fat than traditional frying methods. Tested against hand-cut, deep-fried French fries.',
      price: 79.99,
      list_price: 129.99,
      rating: 4.8,
      reviews_count: 67200,
      is_prime: 1,
      is_best_seller: 1,
      is_amazons_choice: 0,
      in_stock: 1,
      stock_count: 90,
      main_image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80'
      ],
      features: [
        'Up to 75 percent less fat than traditional frying methods',
        'Wide temperature range: 105 to 400 degrees Fahrenheit',
        '4-quart ceramic-coated nonstick basket fits 2 lbs of french fries',
        'Dehydrate feature creates flat, chip-like dehydrated foods for fun snacks',
        'Dishwasher-safe parts include basket, crisper plate, and multi-layer rack'
      ],
      badge: '#1 Best Seller in Air Fryers'
    },
    {
      id: 'prod_7',
      title: 'Kindle Paperwhite (16 GB) – Now with a 6.8-inch display, adjustable warm light, and up to 10 weeks of battery life - Black',
      brand: 'Amazon',
      category: 'Electronics',
      description: 'Kindle Paperwhite is now with a 6.8-inch display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.',
      price: 129.99,
      list_price: 149.99,
      rating: 4.7,
      reviews_count: 31400,
      is_prime: 1,
      is_best_seller: 1,
      is_amazons_choice: 0,
      in_stock: 1,
      stock_count: 65,
      main_image: 'https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=800&q=80'
      ],
      features: [
        '6.8-inch glare-free display reads like real paper even in bright sunlight',
        'Adjustable warm light to shift screen shade from white to amber',
        'Waterproof (IPX8) tested to withstand accidental immersion in water',
        'A single charge via USB-C lasts up to 10 weeks',
        'Pair with an Audible subscription and Bluetooth headphones to listen hands-free'
      ],
      badge: "Amazon's Choice in E-Readers"
    },
    {
      id: 'prod_8',
      title: 'Samsung 34-Inch ViewFinity S65TC Ultra WQHD 1000R Curved Computer Monitor, 100Hz, Thunderbolt 4, Built-in Speakers - Dark Blue/Gray',
      brand: 'Samsung',
      category: 'Computers & Accessories',
      description: 'Experience ultra-wide immersion with 1000R curvature, rich 3440 x 1440 resolution, and dual Thunderbolt 4 ports for seamless connectivity.',
      price: 449.99,
      list_price: 649.99,
      rating: 4.5,
      reviews_count: 1840,
      is_prime: 1,
      is_best_seller: 0,
      is_amazons_choice: 1,
      in_stock: 1,
      stock_count: 18,
      main_image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80'
      ],
      features: [
        'Ultra WQHD (3440 x 1440) resolution fills your peripheral vision',
        '1000R curved screen reduces eye strain with natural field of view',
        'Thunderbolt 4 transmits data up to 40Gbps and charges devices up to 90W',
        'Built-in stereo speakers eliminate the need for extra desk wires',
        '100Hz refresh rate and AMD FreeSync reduce lag and screen tearing'
      ],
      badge: 'Save $200.00 (31% off)'
    },
    {
      id: 'prod_9',
      title: 'Stanley Quencher H2.0 FlowState Stainless Steel Vacuum Insulated Tumbler with Lid and Straw for Water, Iced Tea or Coffee, 40 oz - Charcoal',
      brand: 'Stanley',
      category: 'Home & Kitchen',
      description: 'Constructed of recycled stainless steel for sustainable sipping, our 40 oz Quencher H2.0 offers maximum hydration with fewer refills.',
      price: 45.00,
      list_price: 45.00,
      rating: 4.8,
      reviews_count: 42100,
      is_prime: 1,
      is_best_seller: 1,
      is_amazons_choice: 0,
      in_stock: 1,
      stock_count: 150,
      main_image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&q=80'
      ],
      features: [
        'Keeps drinks cold for 11 hours and iced for up to 2 days',
        'Advanced FlowState lid with 3 positions: straw opening, drink opening, full cover',
        'Ergonomic comfort-grip handle allows you to easily carry it anywhere',
        'Narrow base fits just about any car cup holder',
        'Dishwasher safe for easy cleaning'
      ],
      badge: '#1 Best Seller in Tumblers'
    },
    {
      id: 'prod_10',
      title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones - Hardcover by James Clear',
      brand: 'Penguin Random House',
      category: 'Books',
      description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the worlds leading experts on habit formation, reveals practical strategies that teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
      price: 14.99,
      list_price: 27.00,
      rating: 4.9,
      reviews_count: 118400,
      is_prime: 1,
      is_best_seller: 1,
      is_amazons_choice: 0,
      in_stock: 1,
      stock_count: 240,
      main_image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'
      ],
      features: [
        'Over 15 million copies sold worldwide',
        'Wall Street Journal and New York Times #1 Bestseller',
        'Actionable strategies for overcoming lack of motivation and willpower',
        'Learn how to design your environment to make success easier',
        'Practical tools for getting back on track when you fall off course'
      ],
      badge: '#1 Most Read on Amazon'
    },
    {
      id: 'prod_11',
      title: "Levi's Men's 511 Slim Fit Jeans (Available in Big & Tall) - Native Cali Dark Wash",
      brand: "Levi's",
      category: 'Fashion',
      description: 'A modern slim with room to move, the 511 Slim Fit Jeans are a classic since right now. These jeans sit below the waist with a slim leg from hip to ankle.',
      price: 49.99,
      list_price: 69.50,
      rating: 4.5,
      reviews_count: 36700,
      is_prime: 1,
      is_best_seller: 1,
      is_amazons_choice: 0,
      in_stock: 1,
      stock_count: 85,
      main_image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'
      ],
      features: [
        '99% Cotton, 1% Elastane stretch denim',
        'Slim through the seat and thigh with a slim leg opening',
        'Sits below your waist for a modern everyday fit',
        'Zip fly with button closure and 5-pocket styling',
        'Machine wash cold inside out with like colors'
      ],
      badge: '#1 Best Seller in Men’s Jeans'
    },
    {
      id: 'prod_12',
      title: 'Bose SoundLink Flex Bluetooth Portable Waterproof Speaker, Wireless Outdoor Travel Speaker - Stone Blue',
      brand: 'Bose',
      category: 'Electronics',
      description: 'State-of-the-art design: SoundLink Flex outdoor speaker is packed with exclusive technologies and a custom-engineered transducer for deep, clear, and immersive audio at home or on the go.',
      price: 119.00,
      list_price: 149.00,
      rating: 4.8,
      reviews_count: 24900,
      is_prime: 1,
      is_best_seller: 0,
      is_amazons_choice: 1,
      in_stock: 1,
      stock_count: 40,
      main_image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80'
      ],
      features: [
        'Proprietary PositionIQ technology automatically detects orientation for best sound',
        'IP67 waterproof and dustproof speaker that even floats in water',
        'Resistant to water, dust, and debris with powder-coated steel grille',
        'Up to 12 hours of battery life per charge with USB-C cable',
        'Pair two Bose speakers for Stereo or Party Mode playback'
      ],
      badge: "Amazon's Choice in Portable Bluetooth Speakers"
    }
  ] as unknown as Product[];
