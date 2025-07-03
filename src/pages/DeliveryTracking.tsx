import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Star, Clock, CheckCircle, Package, User, ArrowLeft } from 'lucide-react';

const DeliveryTracking = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const deliveryPartner = {
    name: 'Sarah Johnson',
    rating: 4.8,
    phone: '+1 (555) 123-4567',
    image: '/placeholder.svg',
    deliveries: 1247,
    vehicle: 'Blue Honda Civic - ABC123'
  };

  const trackingEvents = [
    {
      time: '2:45 PM',
      event: 'Package picked up from your address',
      status: 'completed',
      location: '123 Main Street'
    },
    {
      time: '2:52 PM',
      event: 'Package in transit to school',
      status: 'current',
      location: 'En route via Oak Avenue'
    },
    {
      time: '3:15 PM',
      event: 'Arriving at school',
      status: 'pending',
      location: 'Sunshine Elementary School'
    },
    {
      time: '3:20 PM',
      event: 'Package delivered',
      status: 'pending',
      location: 'School Office'
    }
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              onClick={handleBackClick}
              variant="outline" 
              className="flex items-center space-x-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Track Your Delivery
            </h1>
            <p className="text-lg text-gray-600">
              Live updates on your school box delivery
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Partner Info */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-6 h-6 text-primary" />
                  <span>Delivery Partner</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src={deliveryPartner.image} />
                    <AvatarFallback className="gobox-gradient text-white text-xl">
                      {deliveryPartner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-bold text-lg">{deliveryPartner.name}</h3>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{deliveryPartner.rating}</span>
                      <span className="text-sm text-gray-500">({deliveryPartner.deliveries} deliveries)</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{deliveryPartner.phone}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>{deliveryPartner.vehicle}</span>
                    </div>
                  </div>

                  <Badge className="gobox-gradient text-white">
                    On the way
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Live Tracking */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    <span>Live Tracking</span>
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    Last updated: {currentTime.toLocaleTimeString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trackingEvents.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          event.status === 'completed' ? 'bg-green-500 text-white' :
                          event.status === 'current' ? 'bg-blue-500 text-white animate-pulse' :
                          'bg-gray-200 text-gray-500'
                        }`}>
                          {event.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : event.status === 'current' ? (
                            <Clock className="w-5 h-5" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-current" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              event.status === 'current' ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {event.event}
                            </h4>
                            <span className="text-sm text-gray-500">{event.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">{event.location}</p>
                          {event.status === 'current' && (
                            <Badge variant="outline" className="mt-2 text-blue-600 border-blue-600">
                              In Progress
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DeliveryTracking;
