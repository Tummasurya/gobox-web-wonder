
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Zap, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
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
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold w-full sm:w-auto">
              <Link to="/request-delivery">Request Delivery</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-full px-8 py-3 text-lg font-semibold w-full sm:w-auto">
              <Link to="/agent-dashboard">Agent Dashboard</Link>
            </Button>
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
          <Button asChild size="lg" className="gobox-gradient text-white rounded-full px-8 py-3 text-lg font-semibold">
            <Link to="/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
