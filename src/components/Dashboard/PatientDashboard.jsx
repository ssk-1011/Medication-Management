import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import medicationAPI from '../../services/medicationAPI';
import DashboardLayout from './DashboardLayout';
import MedicationCard from '../Medications/MedicationCard';
import AddMedicationModal from '../Medications/AddMedicationModal';
import CalendarView from '../Medications/CalendarView';
import StatsCard from '../UI/StatsCard';
import { Plus, Calendar, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { format, isToday } from 'date-fns';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [medications, setMedications] = useState([]);
  const [adherenceStats, setAdherenceStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [medsData, statsData] = await Promise.all([
        medicationAPI.getMedications(),
        medicationAPI.getAdherenceStats()
      ]);
      setMedications(medsData);
      setAdherenceStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedication = async (medicationData) => {
    try {
      await medicationAPI.addMedication(medicationData);
      await fetchData();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  const handleMarkAsTaken = async (medicationId) => {
    try {
      await medicationAPI.markAsTaken(medicationId, new Date().toISOString());
      await fetchData();
    } catch (error) {
      console.error('Error marking medication as taken:', error);
    }
  };

  const todaysMedications = medications.filter(med => {
    // Simple logic - in real app, this would check frequency and last taken date
    return true;
  });

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Today's Medications"
          value={todaysMedications.length}
          icon={Clock}
          color="blue"
        />
        <StatsCard
          title="Adherence Rate"
          value={`${adherenceStats.overall || 0}%`}
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Medications Taken"
          value={adherenceStats.taken || 0}
          icon={CheckCircle}
          color="purple"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
          <span className="text-sm text-gray-500">
            {format(new Date(), 'EEEE, MMMM do')}
          </span>
        </div>
        
        <div className="space-y-4">
          {todaysMedications.length > 0 ? (
            todaysMedications.map(medication => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                onMarkAsTaken={() => handleMarkAsTaken(medication.id)}
                showTodayAction={true}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No medications scheduled for today</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">All Medications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medications.map(medication => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              onMarkAsTaken={() => handleMarkAsTaken(medication.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <CalendarView medications={medications} />
    </div>
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name}`}
      subtitle="Manage your medications and track your progress"
      actions={
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'overview'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'calendar'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2 inline" />
              Calendar
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Medication
          </button>
        </div>
      }
    >
      {activeView === 'overview' ? renderOverview() : renderCalendar()}
      
      {showAddModal && (
        <AddMedicationModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMedication}
        />
      )}
    </DashboardLayout>
  );
};

export default PatientDashboard;