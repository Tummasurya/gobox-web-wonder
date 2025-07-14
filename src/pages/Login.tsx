
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import deliveryTruckIllustration from '@/assets/delivery-truck-illustration.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Simple validation for demo (in real app, this would be API call)
      if (email.includes('@') && password.length >= 6) {
        login();
        toast({
          title: "Welcome back!",
          description: "Login successful. Redirecting to Request Delivery...",
        });
        navigate('/request-delivery');
      } else {
        toast({
          title: "Login Failed",
          description: "Incorrect email or password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Illustration Section */}
          <div className="hidden lg:flex flex-col items-center justify-center space-y-6">
            <div className="w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
              <img 
                src={deliveryTruckIllustration} 
                alt="GoBox delivery truck illustration" 
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">
                Safe School Deliveries
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Join thousands of parents who trust GoBox for secure and reliable school box deliveries!
              </p>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card rounded-3xl shadow-2xl p-8 space-y-8 border border-border/50">
              
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="gobox-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl">🎒</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Welcome Back!
                  </h1>
                  <p className="text-muted-foreground">
                    Sign in to manage your deliveries
                  </p>
                </div>
              </div>

              {/* Mobile Illustration */}
              <div className="lg:hidden">
                <div className="w-full max-w-xs mx-auto rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                  <img 
                    src={deliveryTruckIllustration} 
                    alt="GoBox delivery truck" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl border-2 border-input focus:border-primary transition-colors duration-200 text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-xl border-2 border-input focus:border-primary transition-colors duration-200 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="text-right">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl text-lg font-semibold gobox-gradient hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Login to GoBox'
                  )}
                </Button>
              </form>

              {/* Signup Link */}
              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-muted-foreground">
                  New to GoBox?{' '}
                  <Link 
                    to="/signup" 
                    className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200 underline underline-offset-2"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
