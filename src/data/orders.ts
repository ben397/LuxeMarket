import { Order } from '../types';

export const orders: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    items: [
      {
        productId: '1',
        name: 'Premium Wireless Headphones',
        price: 249.99,
        quantity: 1
      },
      {
        productId: '6',
        name: 'Wireless Charging Pad',
        price: 29.99,
        quantity: 2
      }
    ],
    status: 'delivered',
    shippingAddress: {
      id: 'a1',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
      isDefault: true
    },
    paymentMethod: 'Credit Card',
    subtotal: 309.97,
    tax: 25.82,
    shipping: 15.00,
    total: 350.79,
    createdAt: '2024-05-01T10:30:00Z'
  },
  {
    id: 'o2',
    userId: 'u2',
    items: [
      {
        productId: '3',
        name: 'Ergonomic Office Chair',
        price: 299.99,
        quantity: 1
      }
    ],
    status: 'shipped',
    shippingAddress: {
      id: 'a2',
      street: '456 Oak Ave',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'USA',
      isDefault: true
    },
    paymentMethod: 'PayPal',
    subtotal: 299.99,
    tax: 24.00,
    shipping: 0.00,
    total: 323.99,
    createdAt: '2024-05-10T14:45:00Z'
  },
  {
    id: 'o3',
    userId: 'u1',
    items: [
      {
        productId: '7',
        name: 'Premium Coffee Maker',
        price: 179.99,
        quantity: 1
      },
      {
        productId: '5',
        name: 'Stainless Steel Water Bottle',
        price: 29.99,
        quantity: 1
      }
    ],
    status: 'processing',
    shippingAddress: {
      id: 'a1',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
      isDefault: true
    },
    paymentMethod: 'Credit Card',
    subtotal: 209.98,
    tax: 17.33,
    shipping: 12.00,
    total: 239.31,
    createdAt: '2024-05-15T09:15:00Z'
  }
];