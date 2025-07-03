
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Package, Phone, CheckCircle, Truck, Calendar, User, DollarSign } from 'lucide-react';

const AgentDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [earnings, setEarnings] = useState(247.80);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deliveryHistory = [
    {
      id: 'DEL001',
      customerName: 'John Smith',
      school: 'Sunshine Elementary',
      pickupTime: '2:30 PM',
      dropTime: '3:15 PM',
      duration: '45 mins',
      earnings: '$8.99',
      rating: 5,
      boxType: 'Books',
      status: 'completed',
      date: '2025-07-03'
    },
    {
      id: 'DEL002',
      customerName: 'Maria Garcia',
      school: 'Oakwood Middle School',
      pickupTime: '1:15 PM',
      dropTime: '1:50 PM',
      duration: '35 mins',
      earnings: '$6.99',
      rating: 4,
      boxType: 'Lunch',
      status: 'completed',
      date: '2025-07-03'
    },
    {
      id: 'DEL003',
      customerName: 'David Johnson',
      school: 'Lincoln High School',
      pickupTime: '12:00 PM',
      dropTime: '12:45 PM',
      duration: '45 mins',
      earnings: '$10.99',
      rating: 5,
      boxType: 'Full Bag',
      status: 'completed',
      date: '2025-07-03'
    },
    {
      id: 'DEL004',
      customerName: 'Sarah Wilson',
      school: 'Cedar Valley Academy',
      pickupTime: '3:30 PM',
      dropTime: 'In Progress',
      duration: 'Ongoing',
      earnings: '$7.99',
      rating: null,
      boxType: 'Books',
      status: 'in-progress',
      date: '2025-07-03'
    }
  ];

  const todayStats = {
    deliveries: deliveryHistory.filter(d => d.status === 'completed').length,
    inProgress: deliveryHistory.filter(d => d.status === 'in-progress').length,
    avgRating: 4.7,
    totalTime: '2h 15m'
  };

  const nextDeliveryPartner = {
    name: 'Mike Rodriguez',
    phone: '+1 (555) 987-6543',
    rating: 4.9,
    vehicle: 'White Toyota Corolla - XYZ789',
    handoffTime: '4:15 PM',
    location: 'Lincoln High School'
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Agent Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Welcome back! Here's your delivery overview for today.
            </p>
            <div className="text-sm text-gray-500 mt-1">
              Last updated: {currentTime.toLocaleTimeString()}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Today's Deliveries</p>
                    <p className="text-3xl font-bold text-primary">{todayStats.deliveries}</p>
                  </div>
                  <Package className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-3xl font-bold text-orange-500">{todayStats.inProgress}</p>
                  </div>
                  <Truck className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-3xl font-bold text-yellow-500">{todayStats.avgRating}</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Today's Earnings</p>
                    <p className="text-3xl font-bold text-green-500">${earnings.toFixed(2)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Next Delivery Partner */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-6 h-6 text-primary" />
                  <span>Next Handoff Partner</span>
                </CardTitle>
                <CardDescription>
                  Upcoming partner for delivery handoff
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarFallback className="gobox-gradient text-white text-lg">
                        {nextDeliveryPartner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg">{nextDeliveryPartner.name}</h3>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{nextDeliveryPartner.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{nextDeliveryPartner.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-gray-500" />
                      <span>{nextDeliveryPartner.vehicle}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>Handoff at {nextDeliveryPartner.handoffTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{nextDeliveryPartner.location}</span>
                    </div>
                  </div>

                  <Button className="w-full gobox-gradient text-white">
                    Contact Partner
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Delivery History */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    <span>Delivery History</span>
                  </CardTitle>
                  <CardDescription>
                    Your recent deliveries with real-time calculations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>School</TableHead>
                          <TableHead>Pickup</TableHead>
                          <TableHead>Drop</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Earnings</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deliveryHistory.map((delivery) => (
                          <TableRow key={delivery.id}>
                            <TableCell className="font-medium">{delivery.id}</TableCell>
                            <TableCell>{delivery.customerName}</TableCell>
                            <TableCell className="max-w-[150px] truncate">
                              {delivery.school}
                            </TableCell>
                            <TableCell>{delivery.pickupTime}</TableCell>
                            <TableCell>{delivery.dropTime}</TableCell>
                            <TableCell>{delivery.duration}</TableCell>
                            <TableCell className="font-medium text-green-600">
                              {delivery.earnings}
                            </TableCell>
                            <TableCell>
                              {delivery.rating ? (
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span>{delivery.rating}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400">Pending</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={delivery.status === 'completed' ? 'default' : 'secondary'}>
                                {delivery.status === 'completed' ? (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                ) : (
                                  <Clock className="w-3 h-3 mr-1" />
                                )}
                                {delivery.status === 'completed' ? 'Completed' : 'In Progress'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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

export default AgentDashboard;
