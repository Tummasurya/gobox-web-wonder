
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import deliveryTruckIllustration from '@/assets/delivery-truck-illustration.jpg';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signInWithGoogle, signInWithApple, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/request-delivery');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await signUp(email, password);
    
    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome to GoBox!",
        description: "Please check your email to confirm your account.",
      });
    }
    
    setIsLoading(false);
  };

  const handleGoogleSignup = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Google Signup Failed",
        description: error.message || "Failed to sign up with Google.",
        variant: "destructive",
      });
    }
  };

  const handleAppleSignup = async () => {
    const { error } = await signInWithApple();
    if (error) {
      toast({
        title: "Apple Signup Failed",
        description: error.message || "Failed to sign up with Apple.",
        variant: "destructive",
      });
    }
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
                Join the GoBox Family
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Create your account to start enjoying safe and reliable school box deliveries!
              </p>
            </div>
          </div>

          {/* Signup Form Section */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card rounded-3xl shadow-2xl p-8 space-y-6 border border-border/50">
              
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="gobox-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl">🎉</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Create Account
                  </h1>
                  <p className="text-muted-foreground">
                    Start your delivery journey today
                  </p>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignup}
                  className="w-full h-12 rounded-xl border-2 hover:bg-muted/50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAppleSignup}
                  className="w-full h-12 rounded-xl border-2 hover:bg-muted/50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </Button>
              </div>

              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card px-4 text-sm text-muted-foreground">
                    or sign up with email
                  </span>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-2 border-input focus:border-primary transition-colors duration-200"
                    required
                  />
                  
                  <Input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-2 border-input focus:border-primary transition-colors duration-200"
                    required
                  />
                  
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 rounded-xl border-2 border-input focus:border-primary transition-colors duration-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl text-lg font-semibold gobox-gradient hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Create GoBox Account'
                  )}
                </Button>
              </form>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200 underline underline-offset-2"
                  >
                    Sign in here
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

export default Signup;
