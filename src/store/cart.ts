import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';
import { products } from '../data/products';

interface CartState {
  items: (CartItem & { name?: string; price?: number; image?: string })[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (productId, quantity) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const price = product.discountPrice || product.price;
        
        set((state) => {
          const existingItem = state.items.find(item => item.productId === productId);
          
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          
          return {
            items: [
              ...state.items,
              { 
                productId, 
                quantity, 
                name: product.name,
                price,
                image: product.images[0]
              }
            ]
          };
        });
      },
      
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item => 
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => {
          if (item.price) {
            return total + (item.price * item.quantity);
          }
          
          const product = products.find(p => p.id === item.productId);
          const price = product ? (product.discountPrice || product.price) : 0;
          
          return total + (price * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);