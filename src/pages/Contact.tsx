
import PageLayout from '@/components/PageLayout';

const Contact = () => {
  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="gobox-gradient w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">💬</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact & Help
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Need help? Have questions? We're here to support you! 
            Our friendly team is ready to assist.
          </p>
          <div className="gobox-gradient rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Get Support:</h2>
            <ul className="text-left space-y-2 max-w-md mx-auto">
              <li>📞 24/7 phone support</li>
              <li>💬 Live chat assistance</li>
              <li>📧 Email support team</li>
              <li>❓ Comprehensive FAQ section</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
