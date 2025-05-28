import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { products } from '../data/products';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1500 });
  const [sortOption, setSortOption] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    return ['All', ...new Set(products.map(product => product.category))];
  }, []);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      product => {
        const price = product.discountPrice || product.price;
        return price >= priceRange.min && price <= priceRange.max;
      }
    );

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, priceRange, sortOption]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory && selectedCategory !== 'All') params.set('category', selectedCategory);
    
    setSearchParams(params);
  }, [searchQuery, selectedCategory, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search query is already applied through the useMemo
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange({ min: 0, max: 1500 });
    setSortOption('featured');
    setSearchParams({});
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Products</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of premium products.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 sticky top-24">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-2 py-1.5 rounded-md transition ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${priceRange.min}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${priceRange.max}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={clearFilters}>
              <X size={16} className="mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Mobile Filters Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <SlidersHorizontal size={16} className="mr-2" />
            Filters
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredProducts.length} products
            </span>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <div className="lg:hidden bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-2 py-1.5 rounded-md transition ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Price Range</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${priceRange.min}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${priceRange.max}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={clearFilters}>
              <X size={16} className="mr-2" />
              Clear Filters
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              </div>
            </form>
            
            <div className="flex-shrink-0 w-full sm:w-48">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== '' && selectedCategory !== 'All') || searchQuery || priceRange.max < 1500 ? (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== '' && selectedCategory !== 'All' && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  Category: {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className="ml-1.5 text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  Search: {searchQuery}
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-1.5 text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {priceRange.max < 1500 && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  Max Price: ${priceRange.max}
                  <button 
                    onClick={() => setPriceRange({ ...priceRange, max: 1500 })}
                    className="ml-1.5 text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          ) : null}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;