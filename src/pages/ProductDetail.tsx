import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, Shield, RotateCw, ShoppingCart, Heart, Share2, ChevronLeft } from 'lucide-react';
import Button from '../components/ui/button';
import Badge from '../components/ui/badge';
import { products } from '../data/products';
import { useCartStore } from '../store/cart';
import { formatPrice, calculateDiscountPercentage, getRelativeTime } from '../lib/utils';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-20 rounded-md border overflow-hidden ${
                    activeImageIndex === index
                      ? 'border-blue-600 ring-2 ring-blue-200 dark:ring-blue-900'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {product.discountPrice && (
            <Badge variant="danger" className="mb-2">
              {calculateDiscountPercentage(product.price, product.discountPrice)}% OFF
            </Badge>
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={`${
                    star <= Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : star <= product.rating
                      ? 'text-yellow-400 fill-yellow-400 opacity-50'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {product.rating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>
          
          <div className="mb-6">
            {product.discountPrice ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {product.stock > 0 ? (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Out of Stock
                </span>
              )}
            </p>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
          </div>
          
          {/* Add to Cart */}
          {product.stock > 0 && (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-24">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                
                <div className="flex-1">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button className="flex items-center text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                  <Heart size={18} className="mr-2" />
                  <span className="text-sm">Add to Wishlist</span>
                </button>
                
                <button className="flex items-center text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                  <Share2 size={18} className="mr-2" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Product Highlights */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <Truck className="text-blue-600 dark:text-blue-400 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">For orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="text-blue-600 dark:text-blue-400 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Secure Payment</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">100% secure checkout</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <RotateCw className="text-blue-600 dark:text-blue-400 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Easy Returns</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">30 day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav className="flex space-x-8" aria-label="Product information tabs">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'description'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700'
              }`}
            >
              Description
            </button>
            
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'specifications'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700'
              }`}
            >
              Specifications
            </button>
            
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700'
              }`}
            >
              Reviews ({product.reviews.length})
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
              </p>
              <p>
                Key Features:
              </p>
              <ul>
                {product.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
                <li>Premium quality materials</li>
                <li>Designed for durability and performance</li>
                <li>Easy to use and maintain</li>
              </ul>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Brand</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">LuxeMarket</dd>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{product.category}</dd>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">1.5 lbs</dd>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Dimensions</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">10" x 5" x 2"</dd>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Material</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">Premium</dd>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Warranty</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">1 Year Limited</dd>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={`${
                          star <= Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {product.rating.toFixed(1)} out of 5
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Based on {product.reviews.length} reviews
                </p>
                
                <Button variant="outline">
                  Write a Review
                </Button>
              </div>
              
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {review.userName}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {getRelativeTime(review.createdAt)}
                      </span>
                    </div>
                    
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`${
                            star <= Math.floor(review.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          You may also like
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map(relatedProduct => (
              <div key={relatedProduct.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {relatedProduct.name}
                  </h3>
                  
                  <div className="mt-1 flex items-center">
                    {relatedProduct.discountPrice ? (
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatPrice(relatedProduct.discountPrice)}
                        </span>
                        <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                          {formatPrice(relatedProduct.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrice(relatedProduct.price)}
                      </span>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => navigate(`/products/${relatedProduct.id}`)}
                >
                  View Product
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;