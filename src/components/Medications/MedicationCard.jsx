import React from 'react';
import { Clock, Pill, CheckCircle, Circle } from 'lucide-react';
import { format, isToday } from 'date-fns';

const MedicationCard = ({ medication, onMarkAsTaken, showTodayAction = false }) => {
  const isTakenToday = medication.takenToday; // This would come from backend logic

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Pill className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">{medication.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {medication.dosage} • {medication.frequency}
            </p>
            
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              Next dose: {medication.nextDose || 'As needed'}
            </div>
          </div>
        </div>

        {showTodayAction && (
          <button
            onClick={onMarkAsTaken}
            disabled={isTakenToday}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isTakenToday
                ? 'bg-green-100 text-green-600 cursor-not-allowed'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            {isTakenToday ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Taken</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                <span>Mark as Taken</span>
              </>
            )}
          </button>
        )}
      </div>

      {medication.notes && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">{medication.notes}</p>
        </div>
      )}
    </div>
  );
};

export default MedicationCard;