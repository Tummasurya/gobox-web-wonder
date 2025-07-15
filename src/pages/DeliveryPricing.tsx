
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Package, User, Star, CheckCircle, Truck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const DeliveryPricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const deliveryData = location.state?.deliveryData;
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState(45);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(prev => prev > 0 ? prev - 1 : 0);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const pricingTiers = [
    {
      type: 'Books',
      price: '$5.99',
      description: 'Books, notebooks, and light materials',
      estimatedTime: '30-45 mins',
      weight: 'Up to 5 lbs'
    },
    {
      type: 'Lunch',
      price: '$4.99',
      description: 'Lunch boxes and food containers',
      estimatedTime: '20-30 mins',
      weight: 'Up to 3 lbs'
    },
    {
      type: 'Full Bag',
      price: '$8.99',
      description: 'Complete school bag with all items',
      estimatedTime: '45-60 mins',
      weight: 'Up to 15 lbs'
    }
  ];

  const deliverySteps = [
    { id: 1, title: 'Request Placed', status: 'completed', time: 'Just now' },
    { id: 2, title: 'Agent Assigned', status: 'current', time: 'In progress' },
    { id: 3, title: 'Pickup', status: 'pending', time: 'Est. 15 mins' },
    { id: 4, title: 'In Transit', status: 'pending', time: 'Est. 35 mins' },
    { id: 5, title: 'Delivered', status: 'pending', time: 'Est. 45 mins' }
  ];

  const selectedPricing = pricingTiers.find(tier => tier.type === deliveryData?.boxType) || pricingTiers[0];

  const handleConfirmOrder = async () => {
    if (!user || !deliveryData) {
      toast({
        title: "Error",
        description: "Missing user information or delivery data.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('delivery_requests')
        .insert({
          user_id: user.id,
          full_name: deliveryData.fullName,
          phone: deliveryData.phone,
          pickup_address: deliveryData.pickupAddress,
          pickup_date: deliveryData.pickupDate,
          pickup_time: deliveryData.pickupTime,
          school_name: deliveryData.schoolName,
          box_type: deliveryData.boxType,
          notes: deliveryData.notes || null,
          status: 'Confirmed'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Order Confirmed!",
        description: "Your delivery request has been successfully submitted.",
      });

      navigate('/delivery-tracking');
    } catch (error) {
      console.error('Error saving delivery request:', error);
      toast({
        title: "Error",
        description: "Failed to confirm order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Delivery Details & Pricing
            </h1>
            <p className="text-lg text-gray-600">
              Your delivery request is being processed
            </p>
          </div>

          {/* Progress Flow */}
          <div className="mb-12">
            <div className="flex justify-between items-center bg-white rounded-2xl p-6 shadow-lg">
              {deliverySteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'current' ? 'bg-blue-500 text-white animate-pulse' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-semibold">{step.id}</span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900 text-center">
                      {step.title}
                    </span>
                    <span className="text-xs text-gray-500 text-center">
                      {step.time}
                    </span>
                  </div>
                  {index < deliverySteps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pricing Details */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-6 h-6 text-primary" />
                  <span>Delivery Pricing</span>
                </CardTitle>
                <CardDescription>
                  Transparent pricing for your delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-primary/10 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {selectedPricing.type} - {selectedPricing.price}
                    </h3>
                    <p className="text-gray-600 mb-4">{selectedPricing.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{selectedPricing.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span>{selectedPricing.weight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Price</span>
                      <span>{selectedPricing.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>$1.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>$2.99</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>$11.97</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Tracking */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-6 h-6 text-primary" />
                  <span>Live Tracking</span>
                </CardTitle>
                <CardDescription>
                  Real-time updates on your delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {estimatedTime} mins
                    </div>
                    <p className="text-gray-600">Estimated delivery time</p>
                    <Progress value={25} className="mt-4" />
                  </div>

                  {deliveryData && (
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="font-medium">Pickup Address</p>
                          <p className="text-sm text-gray-600">{deliveryData.pickupAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="font-medium">Delivery Address</p>
                          <p className="text-sm text-gray-600">{deliveryData.schoolName}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleConfirmOrder}
                    disabled={isLoading}
                    className="w-full gobox-gradient text-white rounded-xl mb-4"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Confirming Order...</span>
                      </div>
                    ) : (
                      <>
                        Confirm Order
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/delivery-tracking')}
                    variant="outline"
                    className="w-full rounded-xl"
                  >
                    View Full Tracking
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DeliveryPricing;
