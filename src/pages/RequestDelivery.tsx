
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Package, Clock, User, Phone, MapPin, School, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  pickupAddress: z.string().min(10, 'Please enter a complete pickup address'),
  schoolName: z.string().min(2, 'Please select or enter a school name'),
  pickupDate: z.date({
    required_error: 'Please select a pickup date',
  }),
  pickupTime: z.string().min(1, 'Please select a pickup time'),
  boxType: z.string().min(1, 'Please select a box type'),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const RequestDelivery = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      pickupAddress: '',
      schoolName: '',
      pickupTime: '',
      boxType: '',
      additionalNotes: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setShowConfirmation(true);
    form.reset();
  };

  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM',
    '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM',
    '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const schools = [
    'Sunshine Elementary School',
    'Oakwood Middle School',
    'Lincoln High School',
    'Riverside Elementary',
    'Maple Grove School',
    'Cedar Valley Academy',
    'Other (Custom)'
  ];

  const boxTypes = [
    'Books',
    'Lunch',
    'Full Bag'
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="gobox-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Schedule a School Box Delivery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to request pickup and delivery of your child's school essentials.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">1</span>
                </div>
                <span className="text-primary font-medium">Requested</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-sm">2</span>
                </div>
                <span className="text-gray-500 font-medium">Picked</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-semibold text-sm">3</span>
                </div>
                <span className="text-gray-500 font-medium">Delivered</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2 text-gray-700 font-semibold">
                          <User className="w-4 h-4" />
                          <span>Full Name</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter parent's full name"
                            className="rounded-xl border-2 border-gray-200 focus:border-primary h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Number */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2 text-gray-700 font-semibold">
                          <Phone className="w-4 h-4" />
                          <span>Phone Number</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="(555) 123-4567"
                            className="rounded-xl border-2 border-gray-200 focus:border-primary h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Pickup Address */}
                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700 font-semibold">
                        <MapPin className="w-4 h-4" />
                        <span>Pickup Address</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter complete pickup address including street, city, state, and zip code"
                          className="rounded-xl border-2 border-gray-200 focus:border-primary min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* School Name */}
                  <FormField
                    control={form.control}
                    name="schoolName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2 text-gray-700 font-semibold">
                          <School className="w-4 h-4" />
                          <span>School Name</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-2 border-gray-200 focus:border-primary h-12">
                              <SelectValue placeholder="Select your child's school" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {schools.map((school) => (
                              <SelectItem key={school} value={school}>
                                {school}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Box Type */}
                  <FormField
                    control={form.control}
                    name="boxType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2 text-gray-700 font-semibold">
                          <Package className="w-4 h-4" />
                          <span>Box Type</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-2 border-gray-200 focus:border-primary h-12">
                              <SelectValue placeholder="Select box type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {boxTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pickup Date */}
                  <FormField
                    control={form.control}
                    name="pickupDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>Preferred Pickup Date</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "rounded-xl border-2 border-gray-200 focus:border-primary h-12 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Pickup Time */}
                  <FormField
                    control={form.control}
                    name="pickupTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2 text-gray-700 font-semibold">
                          <Clock className="w-4 h-4" />
                          <span>Preferred Pickup Time</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-2 border-gray-200 focus:border-primary h-12">
                              <SelectValue placeholder="Select pickup time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Notes */}
                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">
                        Additional Notes (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special instructions or additional information..."
                          className="rounded-xl border-2 border-gray-200 focus:border-primary min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="gobox-gradient text-white rounded-full px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Package className="w-5 h-5 mr-2" />
                    Place Delivery Request
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Request Submitted!
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-lg">
              Thank you! Your delivery request has been placed. You'll receive a confirmation shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 text-center">
            <Button 
              onClick={() => setShowConfirmation(false)}
              className="gobox-gradient text-white rounded-full px-8 py-2"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default RequestDelivery;
