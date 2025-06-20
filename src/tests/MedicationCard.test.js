import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MedicationCard from '../components/Medications/MedicationCard';

// Mock the date-fns functions
vi.mock('date-fns', () => ({
  format: vi.fn(() => '12/25/2023'),
  isToday: vi.fn(() => true)
}));

describe('MedicationCard', () => {
  const mockMedication = {
    id: 1,
    name: 'Test Medicine',
    dosage: '200mg',
    frequency: 'Daily',
    notes: 'Take with food',
    takenToday: false
  };

  it('renders medication information correctly', () => {
    render(<MedicationCard medication={mockMedication} />);
    
    expect(screen.getByText('Test Medicine')).toBeInTheDocument();
    expect(screen.getByText('200mg • Daily')).toBeInTheDocument();
    expect(screen.getByText('Take with food')).toBeInTheDocument();
  });

  it('calls onMarkAsTaken when mark as taken button is clicked', () => {
    const mockOnMarkAsTaken = vi.fn();
    
    render(
      <MedicationCard 
        medication={mockMedication} 
        onMarkAsTaken={mockOnMarkAsTaken}
        showTodayAction={true}
      />
    );
    
    const markButton = screen.getByText('Mark as Taken');
    fireEvent.click(markButton);
    
    expect(mockOnMarkAsTaken).toHaveBeenCalledTimes(1);
  });

  it('shows taken status when medication is already taken', () => {
    const takenMedication = { ...mockMedication, takenToday: true };
    
    render(
      <MedicationCard 
        medication={takenMedication} 
        showTodayAction={true}
      />
    );
    
    expect(screen.getByText('Taken')).toBeInTheDocument();
    expect(screen.queryByText('Mark as Taken')).not.toBeInTheDocument();
  });
});