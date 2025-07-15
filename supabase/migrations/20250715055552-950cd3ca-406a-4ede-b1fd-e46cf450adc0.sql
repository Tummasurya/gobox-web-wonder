-- Enable Row Level Security on delivery_requests table
ALTER TABLE public.delivery_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for users to insert their own delivery requests
CREATE POLICY "Users can create their own delivery requests" 
ON public.delivery_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to view their own delivery requests
CREATE POLICY "Users can view their own delivery requests" 
ON public.delivery_requests 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to update their own delivery requests
CREATE POLICY "Users can update their own delivery requests" 
ON public.delivery_requests 
FOR UPDATE 
USING (auth.uid() = user_id);