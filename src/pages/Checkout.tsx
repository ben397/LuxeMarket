import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../store/auth';
import { formatPrice } from '../lib/utils';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    address: user?.addresses[0]?.street || '',
    city: user?.addresses[0]?.city || '',
    state: user?.addresses[0]?.state || '',
    postalCode: user?.addresses[0]?.postalCode || '',
    country: user?.addresses[0]?.country || 'USA',
    phone: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    sameAsShipping: true,
  });

  // Calculate summary values
  const subtotal = getTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      // Simulate order processing
      setTimeout(() => {
        setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
        setOrderComplete(true);
        setCurrentStep('confirmation');
        clearCart();
      }, 1500);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    }
  };

  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Checkout Header */}
      <div className="mb-8">
        {!orderComplete && (
          <Link 
            to={currentStep === 'shipping' ? '/cart' : '#'} 
            onClick={currentStep === 'payment' ? handlePreviousStep : undefined}
            className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ChevronLeft size={16} className="mr-1" />
            {currentStep === 'shipping' ? 'Back to Cart' : 'Back to Shipping'}
          </Link>
        )}
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
          {orderComplete ? 'Order Confirmation' : 'Checkout'}
        </h1>
      </div>

      {/* Checkout Steps Indicator */}
      {!orderComplete && (
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-sm">
                1
              </div>
              <span className="ml-2 text-sm font-medium">Shipping</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-4 ${currentStep === 'shipping' ? 'bg-gray-200 dark:bg-gray-800' : 'bg-blue-500 dark:bg-blue-600'}`}></div>
            
            <div className={`flex items-center ${currentStep === 'shipping' ? 'text-gray-400 dark:text-gray-600' : 'text-blue-600 dark:text-blue-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                currentStep === 'shipping' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600' 
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-4 ${currentStep === 'confirmation' ? 'bg-blue-500 dark:bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'}`}></div>
            
            <div className={`flex items-center ${currentStep === 'confirmation' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                currentStep === 'confirmation' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
              }`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Content */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Shipping Form */}
          {currentStep === 'shipping' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input
                  label="First Name"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleShippingChange}
                  required
                />
                
                <Input
                  label="Last Name"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <Input
                  label="Street Address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="City"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  required
                />
                
                <Input
                  label="State / Province"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Postal Code"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleShippingChange}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    required
                  >
                    <option value="USA">United States</option>
                    <option value="CAN">Canada</option>
                    <option value="GBR">United Kingdom</option>
                    <option value="AUS">Australia</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleNextStep}>
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}
          
          {/* Payment Form */}
          {currentStep === 'payment' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Information
              </h2>
              
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center">
                    <input
                      id="credit-card"
                      name="paymentMethod"
                      type="radio"
                      checked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <label htmlFor="credit-card" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Credit Card
                    </label>
                  </div>
                  
                  <div className="flex items-center opacity-50">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      disabled
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <label htmlFor="paypal" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      PayPal
                    </label>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-800 rounded-md p-4">
                  <div className="mb-4">
                    <Input
                      label="Name on Card"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Input
                      label="Card Number"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <Input
                      label="Expiration Date"
                      name="expDate"
                      value={paymentInfo.expDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      required
                    />
                    
                    <Input
                      label="CVV"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      placeholder="XXX"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    id="same-address"
                    name="sameAsShipping"
                    type="checkbox"
                    checked={paymentInfo.sameAsShipping}
                    onChange={handlePaymentChange}
                    className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <label htmlFor="same-address" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Billing address is the same as shipping address
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                >
                  Back to Shipping
                </Button>
                
                <Button onClick={handleNextStep}>
                  Place Order
                </Button>
              </div>
            </div>
          )}
          
          {/* Confirmation */}
          {currentStep === 'confirmation' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Thank You for Your Order!
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your order has been successfully placed and is being processed.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 inline-block">
                <p className="text-gray-700 dark:text-gray-300 text-sm">Order Number:</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{orderNumber}</p>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                A confirmation email has been sent to <span className="font-medium">{shippingInfo.email}</span>
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
                
                <Button variant="outline" asChild>
                  <Link to="/orders">View My Orders</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            
            {!orderComplete && (
              <div className="mb-4 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.productId} className="flex py-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-gray-900 dark:text-white font-medium">{item.name}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {formatPrice(item.price! * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
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
            
            {orderComplete && (
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Shipping Address</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {shippingInfo.firstName} {shippingInfo.lastName}<br />
                  {shippingInfo.address}<br />
                  {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}<br />
                  {shippingInfo.country}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;