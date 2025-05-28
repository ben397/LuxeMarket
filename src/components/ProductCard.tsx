import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import Badge from './ui/badge';
import Button from './ui/button';
import { Product } from '../types';
import { formatPrice, calculateDiscountPercentage } from '../lib/utils';
import { useCartStore } from '../store/cart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {product.discountPrice && (
          <Badge variant="danger" className="absolute top-2 right-2">
            {calculateDiscountPercentage(product.price, product.discountPrice)}% OFF
          </Badge>
        )}
        
        <div className="absolute top-2 left-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-red-400">
            <Heart size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/products/${product.id}`} className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
        </Link>
        
        <div className="mt-3 flex items-center justify-between">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <Button 
            size="sm" 
            variant="primary"
            className="group/btn"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="mr-1" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;