import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft, ArrowRight } from 'lucide-react';
import Button from '../components/ui/button';
import { useCartStore } from '../store/cart';
import { products } from '../data/products';
import { formatPrice } from '../lib/utils';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Calculate summary values
  const subtotal = getTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      setCouponError('Invalid or expired coupon code');
      setIsApplyingCoupon(false);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <ShoppingBag size={64} className="text-gray-300 dark:text-gray-700 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        <Button variant="outline" size="sm" asChild>
          <Link to="/products" className="inline-flex items-center">
            <ChevronLeft size={16} className="mr-1" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:flex border-b border-gray-200 dark:border-gray-800 p-4">
              <div className="w-2/5 font-medium text-gray-700 dark:text-gray-300">Product</div>
              <div className="w-1/5 text-center font-medium text-gray-700 dark:text-gray-300">Price</div>
              <div className="w-1/5 text-center font-medium text-gray-700 dark:text-gray-300">Quantity</div>
              <div className="w-1/5 text-right font-medium text-gray-700 dark:text-gray-300">Subtotal</div>
            </div>
            
            {items.map((item) => {
              const product = products.find(p => p.id === item.productId);
              if (!product) return null;
              
              const price = product.discountPrice || product.price;
              const itemTotal = price * item.quantity;
              
              return (
                <div key={item.productId} className="border-b border-gray-200 dark:border-gray-800 p-4">
                  <div className="md:flex md:items-center">
                    {/* Mobile: Product with Image, Name, Price */}
                    <div className="flex items-center w-full md:w-2/5 mb-4 md:mb-0">
                      <Link to={`/products/${product.id}`} className="w-20 h-20 flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </Link>
                      <div className="ml-4 flex-1">
                        <Link to={`/products/${product.id}`} className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400">
                          {product.name}
                        </Link>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          {product.category}
                        </div>
                        <div className="md:hidden mt-2 text-gray-900 dark:text-white font-medium">
                          {formatPrice(price)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop: Price */}
                    <div className="hidden md:block w-1/5 text-center text-gray-900 dark:text-white">
                      {formatPrice(price)}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between md:justify-center md:w-1/5">
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                          disabled={item.quantity >= (product.stock || 10)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="ml-3 md:ml-4 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {/* Desktop: Subtotal */}
                    <div className="hidden md:block w-1/5 text-right font-medium text-gray-900 dark:text-white">
                      {formatPrice(itemTotal)}
                    </div>
                    
                    {/* Mobile: Subtotal */}
                    <div className="md:hidden mt-3 flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrice(itemTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="p-4 flex justify-between">
              <Button variant="outline" size="sm" onClick={clearCart} className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900/30 dark:hover:bg-red-900/20">
                Clear Cart
              </Button>
              
              <Button size="sm" onClick={() => navigate('/products')}>
                Add More Items
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-800 my-3 pt-3 flex justify-between font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Apply Coupon
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    setCouponError('');
                  }}
                  placeholder="Enter coupon code"
                  className="flex-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                <Button
                  onClick={handleApplyCoupon}
                  className="rounded-l-none"
                  disabled={isApplyingCoupon}
                >
                  {isApplyingCoupon ? 'Applying...' : 'Apply'}
                </Button>
              </div>
              {couponError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{couponError}</p>
              )}
            </div>
            
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
              <ArrowRight size={16} className="ml-2" />
            </Button>
            
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-500 text-center">
              Free shipping on orders over $100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;