
import PageLayout from '@/components/PageLayout';

const AgentDashboard = () => {
  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="gobox-gradient w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">🚚</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Agent Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome delivery agents! This is your central hub for managing deliveries 
            and tracking your performance.
          </p>
          <div className="gobox-gradient rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Dashboard Features:</h2>
            <ul className="text-left space-y-2 max-w-md mx-auto">
              <li>📊 View available delivery requests</li>
              <li>🗺️ Optimize your delivery routes</li>
              <li>💰 Track your earnings</li>
              <li>⭐ Manage your ratings and reviews</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AgentDashboard;
