import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions.',
    price: 299.99,
    discountPrice: 249.99,
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Electronics',
    tags: ['headphones', 'wireless', 'audio', 'premium'],
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        userId: 'u2',
        userName: 'Sarah Johnson',
        rating: 5,
        comment: 'Best headphones ever owned! The noise cancellation is incredible.',
        createdAt: '2024-05-15T12:30:00Z'
      },
      {
        id: 'r2',
        userId: 'u3',
        userName: 'Michael Chen',
        rating: 4.5,
        comment: 'Great sound quality and comfortable for long periods. Battery life is excellent.',
        createdAt: '2024-05-10T09:15:00Z'
      }
    ],
    stock: 45,
    featured: true,
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with our advanced smart watch. Features include heart rate monitoring, sleep tracking, 50+ workout modes, and 7-day battery life. Water-resistant up to 50 meters.',
    price: 199.99,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Wearables',
    tags: ['fitness', 'smartwatch', 'health', 'wearable'],
    rating: 4.6,
    reviews: [
      {
        id: 'r3',
        userId: 'u1',
        userName: 'Alex Rivera',
        rating: 4.5,
        comment: 'Accurate tracking and comfortable to wear all day.',
        createdAt: '2024-05-12T14:20:00Z'
      }
    ],
    stock: 72,
    featured: true,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Work in comfort with our ergonomic office chair. Designed with lumbar support, adjustable height, and breathable mesh material to keep you comfortable during long work sessions.',
    price: 349.99,
    discountPrice: 299.99,
    images: [
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Furniture',
    tags: ['chair', 'office', 'ergonomic', 'furniture'],
    rating: 4.7,
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Emily Watson',
        rating: 5,
        comment: 'My back pain is gone after switching to this chair. Worth every penny!',
        createdAt: '2024-05-08T16:45:00Z'
      },
      {
        id: 'r5',
        userId: 'u5',
        userName: 'David Parker',
        rating: 4.5,
        comment: 'Very comfortable and easy to assemble. Highly recommend!',
        createdAt: '2024-05-05T11:10:00Z'
      }
    ],
    stock: 28,
    featured: false,
    createdAt: '2024-02-01T09:45:00Z'
  },
  {
    id: '4',
    name: 'Professional DSLR Camera',
    description: 'Capture stunning photos and videos with our professional DSLR camera. Features a 24.2MP sensor, 4K video recording, 45-point autofocus system, and includes an 18-55mm lens kit.',
    price: 1299.99,
    images: [
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3497065/pexels-photo-3497065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Electronics',
    tags: ['camera', 'photography', 'dslr', 'professional'],
    rating: 4.9,
    reviews: [
      {
        id: 'r6',
        userId: 'u6',
        userName: 'James Wilson',
        rating: 5,
        comment: 'Amazing camera for both beginners and professionals. The image quality is outstanding.',
        createdAt: '2024-05-14T08:30:00Z'
      }
    ],
    stock: 15,
    featured: true,
    createdAt: '2024-02-10T11:15:00Z'
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    description: 'Stay hydrated with our vacuum-insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof design and available in multiple colors.',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Home & Kitchen',
    tags: ['water bottle', 'eco-friendly', 'kitchen', 'hydration'],
    rating: 4.5,
    reviews: [
      {
        id: 'r7',
        userId: 'u7',
        userName: 'Sophia Martinez',
        rating: 4.5,
        comment: 'Great quality bottle. Keeps my water cold all day!',
        createdAt: '2024-05-11T17:25:00Z'
      },
      {
        id: 'r8',
        userId: 'u8',
        userName: 'Daniel Brown',
        rating: 4.5,
        comment: 'Sturdy and well-made. No leaks so far.',
        createdAt: '2024-05-09T13:50:00Z'
      }
    ],
    stock: 120,
    featured: false,
    createdAt: '2024-02-15T13:30:00Z'
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    description: 'Charge your compatible devices wirelessly with our fast-charging pad. Supports up to 15W charging speed and includes intelligent temperature control for safe charging.',
    price: 39.99,
    discountPrice: 29.99,
    images: [
      'https://images.pexels.com/photos/4383928/pexels-photo-4383928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3850213/pexels-photo-3850213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Electronics',
    tags: ['charger', 'wireless', 'smartphone', 'accessories'],
    rating: 4.4,
    reviews: [
      {
        id: 'r9',
        userId: 'u9',
        userName: 'Olivia Taylor',
        rating: 4,
        comment: 'Works great with my iPhone. Charging is a bit slower than wired but very convenient.',
        createdAt: '2024-05-13T10:05:00Z'
      }
    ],
    stock: 85,
    featured: false,
    createdAt: '2024-02-20T15:45:00Z'
  },
  {
    id: '7',
    name: 'Premium Coffee Maker',
    description: 'Brew the perfect cup of coffee with our premium coffee maker. Features programmable brewing, adjustable strength control, and a built-in grinder for the freshest coffee experience.',
    price: 179.99,
    images: [
      'https://images.pexels.com/photos/2878712/pexels-photo-2878712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Home & Kitchen',
    tags: ['coffee', 'kitchen', 'appliance', 'brewing'],
    rating: 4.7,
    reviews: [
      {
        id: 'r10',
        userId: 'u10',
        userName: 'Nathan Anderson',
        rating: 5,
        comment: 'Best coffee maker ever owned! The built-in grinder makes a huge difference.',
        createdAt: '2024-05-07T09:40:00Z'
      },
      {
        id: 'r11',
        userId: 'u11',
        userName: 'Isabella Lee',
        rating: 4.5,
        comment: 'Easy to use and clean. Makes delicious coffee every time.',
        createdAt: '2024-05-04T08:15:00Z'
      }
    ],
    stock: 32,
    featured: true,
    createdAt: '2024-02-25T16:20:00Z'
  },
  {
    id: '8',
    name: 'Leather Messenger Bag',
    description: 'Carry your essentials in style with our genuine leather messenger bag. Features multiple compartments, adjustable shoulder strap, and fits laptops up to 15 inches.',
    price: 149.99,
    discountPrice: 129.99,
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Fashion',
    tags: ['bag', 'leather', 'messenger', 'accessory'],
    rating: 4.6,
    reviews: [
      {
        id: 'r12',
        userId: 'u12',
        userName: 'William Thompson',
        rating: 4.5,
        comment: 'Great quality leather and craftsmanship. Very spacious interior.',
        createdAt: '2024-05-06T15:35:00Z'
      }
    ],
    stock: 48,
    featured: false,
    createdAt: '2024-03-01T14:10:00Z'
  }
];
