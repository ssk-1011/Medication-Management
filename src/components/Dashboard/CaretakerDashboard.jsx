import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from './DashboardLayout';
import StatsCard from '../UI/StatsCard';
import { Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const CaretakerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPatients: 0,
    averageAdherence: 0,
    alertsCount: 0,
    completedToday: 0
  });

  useEffect(() => {
    // Mock data for caretaker dashboard
    setStats({
      totalPatients: 8,
      averageAdherence: 87,
      alertsCount: 3,
      completedToday: 24
    });
  }, []);

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name}`}
      subtitle="Monitor and manage your patients' medication adherence"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Avg. Adherence"
            value={`${stats.averageAdherence}%`}
            icon={TrendingUp}
            color="green"
          />
          <StatsCard
            title="Active Alerts"
            value={stats.alertsCount}
            icon={AlertTriangle}
            color="orange"
          />
          <StatsCard
            title="Completed Today"
            value={stats.completedToday}
            icon={CheckCircle}
            color="purple"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Overview</h2>
          
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Caretaker Dashboard</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              This is a placeholder for the caretaker dashboard. In the full implementation, 
              this would show patient lists, medication compliance, and management tools.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CaretakerDashboard;