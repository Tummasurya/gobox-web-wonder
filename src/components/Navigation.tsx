
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const getNavigation = () => {
    const baseNavigation = [
      { name: 'Home', href: '/' },
      { name: 'Request Delivery', href: '/request-delivery' },
      { name: 'Contact / Help', href: '/contact' },
    ];

    if (isLoggedIn) {
      baseNavigation.splice(2, 0, { name: 'Agent Dashboard', href: '/agent-dashboard' });
    }

    return baseNavigation;
  };

  const navigation = getNavigation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <div className="gobox-gradient p-2 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary">GoBox</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:text-primary hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex space-x-2 ml-4">
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full gobox-gradient">
                <Link to="/signup" className="text-white">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-primary hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 px-3">
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full gobox-gradient">
                <Link to="/signup" className="text-white" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
