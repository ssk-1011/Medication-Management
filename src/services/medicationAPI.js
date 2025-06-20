import axios from 'axios';

const API_URL = '/api/medications';

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

const medicationAPI = {
  getMedications: async () => {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() });
    return response.data;
  },

  addMedication: async (medicationData) => {
    const response = await axios.post(API_URL, medicationData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  },

  updateMedication: async (id, medicationData) => {
    const response = await axios.put(`${API_URL}/${id}`, medicationData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  },

  deleteMedication: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  },

  markAsTaken: async (medicationId, date) => {
    const response = await axios.post(`${API_URL}/${medicationId}/taken`, 
      { date }, 
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  getAdherenceStats: async () => {
    const response = await axios.get(`${API_URL}/adherence`, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  }
};

export default medicationAPI;