import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { useAuthStore } from '../store/auth';
import { mockCredentials } from '../data/users';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginOption, setLoginOption] = useState<'user' | 'admin'>('user');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleDemoLogin = async (type: 'user' | 'admin') => {
    setLoginOption(type);
    const credentials = type === 'user' ? mockCredentials.user : mockCredentials.admin;
    setEmail(credentials.email);
    setPassword(credentials.password);
    
    try {
      await login(credentials.email, credentials.password);
      navigate('/');
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Enter your email and password to access your account
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            
            <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Forgot password?
            </Link>
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleDemoLogin('user')}
              disabled={isLoading}
              className={loginOption === 'user' ? 'border-blue-500 dark:border-blue-400' : ''}
            >
              Demo User
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
              className={loginOption === 'admin' ? 'border-blue-500 dark:border-blue-400' : ''}
            >
              Demo Admin
            </Button>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            Sign up
          </Link>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
        This is a demo application. No real authentication is implemented.
      </div>
    </div>
  );
};

export default Login;