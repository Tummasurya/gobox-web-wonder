import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Star, Clock, CheckCircle, Package, User, ArrowLeft, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const DeliveryTracking = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [deliveryRequest, setDeliveryRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchLatestDeliveryRequest = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('delivery_requests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          throw error;
        }

        setDeliveryRequest(data);
      } catch (error) {
        console.error('Error fetching delivery request:', error);
        toast({
          title: "Error",
          description: "Failed to load delivery information.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestDeliveryRequest();
  }, [user, toast]);

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

  const pricingInfo = {
    Books: { price: '$5.99', description: 'Books, notebooks, and light materials' },
    Lunch: { price: '$4.99', description: 'Lunch boxes and food containers' },
    'Full Bag': { price: '$8.99', description: 'Complete school bag with all items' }
  };

  const getSelectedPricing = () => {
    return deliveryRequest ? pricingInfo[deliveryRequest.box_type] || pricingInfo['Books'] : pricingInfo['Books'];
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

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading delivery information...</p>
            </div>
          ) : !deliveryRequest ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Deliveries</h3>
              <p className="text-gray-600 mb-6">You don't have any active delivery requests.</p>
              <Button onClick={() => navigate('/request-delivery')} className="gobox-gradient text-white">
                Request New Delivery
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Details */}
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="w-6 h-6 text-primary" />
                      <span>Order Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Customer</label>
                        <p className="font-semibold">{deliveryRequest.full_name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="font-semibold">{deliveryRequest.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Pickup Address</label>
                        <p className="text-sm">{deliveryRequest.pickup_address}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">School</label>
                        <p className="text-sm">{deliveryRequest.school_name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Box Type</label>
                        <p className="font-semibold">{deliveryRequest.box_type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Scheduled Pickup</label>
                        <p className="text-sm">
                          {new Date(deliveryRequest.pickup_date).toLocaleDateString()} at {deliveryRequest.pickup_time}
                        </p>
                      </div>
                      {deliveryRequest.notes && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Notes</label>
                          <p className="text-sm">{deliveryRequest.notes}</p>
                        </div>
                      )}
                      <Badge className={`${
                        deliveryRequest.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        deliveryRequest.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {deliveryRequest.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing Details */}
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="w-6 h-6 text-primary" />
                      <span>Pricing Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-primary/10 rounded-lg p-4">
                        <h3 className="font-bold text-primary mb-1">
                          {deliveryRequest.box_type}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {getSelectedPricing().description}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {getSelectedPricing().price}
                        </p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Base Price</span>
                          <span>{getSelectedPricing().price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service Fee</span>
                          <span>$1.99</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>$2.99</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold text-base">
                          <span>Total</span>
                          <span>$11.97</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
                      {deliveryRequest?.status === 'Confirmed' ? 'Agent Assigned' : 'On the way'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              </div>

              {/* Live Tracking */}
              <div className="lg:col-span-3 mt-8">
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
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default DeliveryTracking;
