
import PageLayout from '@/components/PageLayout';

const Login = () => {
  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="gobox-gradient w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Login
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome back! Sign in to access your GoBox account and manage your deliveries.
          </p>
          <div className="gobox-gradient rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Login Options:</h2>
            <ul className="text-left space-y-2 max-w-md mx-auto">
              <li>📧 Email and password login</li>
              <li>📱 Phone number verification</li>
              <li>🔗 Social media login options</li>
              <li>🔒 Secure authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
