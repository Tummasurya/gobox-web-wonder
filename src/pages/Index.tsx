import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Zap, Shield, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRequestDelivery = () => {
    if (user) {
      navigate('/request-delivery');
    } else {
      navigate('/login');
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/request-delivery');
    } else {
      navigate('/signup');
    }
  };

  const features = [
    {
      icon: Package,
      title: 'Safe Delivery',
      description: 'Your school boxes delivered safely to your doorstep'
    },
    {
      icon: Zap,
      title: 'Super Fast',
      description: 'Quick delivery within your school area'
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Trusted agents and secure handling'
    },
    {
      icon: Clock,
      title: 'On Time',
      description: 'Always delivered when you need it'
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="gobox-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">GoBox</span>!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            The easiest way to get your school boxes delivered safely
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button 
              onClick={handleRequestDelivery}
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold w-full sm:w-auto"
            >
              Request Delivery
            </Button>
            {user && (
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-full px-8 py-3 text-lg font-semibold w-full sm:w-auto">
                <Link to="/agent-dashboard">Agent Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GoBox?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make school box delivery simple, safe, and fun for everyone!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="gobox-card-hover border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8 text-center">
                  <div className="gobox-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of happy students and parents using GoBox for safe school deliveries!
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="gobox-gradient text-white rounded-full px-8 py-3 text-lg font-semibold"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer Section with Office Address and Contact Details */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div className="gobox-gradient p-2 rounded-xl">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">GoBox</span>
              </div>
              <p className="text-gray-300 mb-4">
                Making school deliveries safe, fast, and fun for everyone!
              </p>
            </div>

            {/* Office Address */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start">
                <MapPin className="h-5 w-5 mr-2" />
                Office Address
              </h3>
              <div className="text-gray-300 space-y-1">
                <p>123 School Street</p>
                <p>Education District</p>
                <p>Learning City, LC 12345</p>
                <p>United States</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="h-5 w-5 mr-3 text-green-400" />
                  <span className="text-gray-300">(555) 123-GOBOX</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <span className="text-gray-300">hello@gobox.com</span>
                </div>
                <div className="text-gray-300 text-sm mt-4">
                  <p>Business Hours:</p>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 GoBox. All rights reserved. Making school deliveries awesome! 📦✨
            </p>
          </div>
        </div>
      </footer>
    </PageLayout>
  );
};

export default Index;
