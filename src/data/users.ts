import { User } from '../types';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    email: 'alex@example.com',
    role: 'user',
    addresses: [
      {
        id: 'a1',
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA',
        isDefault: true
      }
    ]
  },
  {
    id: 'u2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'user',
    addresses: [
      {
        id: 'a2',
        street: '456 Oak Ave',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
        isDefault: true
      }
    ]
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@luxemarket.com',
    role: 'admin',
    addresses: [
      {
        id: 'a3',
        street: '789 Market St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        isDefault: true
      }
    ]
  }
];

// For simplicity, use these credentials for mock authentication
export const mockCredentials = {
  user: {
    email: 'user@example.com',
    password: 'password123'
  },
  admin: {
    email: 'admin@luxemarket.com',
    password: 'admin123'
  }
};