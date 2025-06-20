import { describe, it, expect, vi, beforeEach } from 'vitest';
import authAPI from '../services/authAPI';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('authAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login successfully with valid credentials', async () => {
    const mockResponse = {
      data: {
        token: 'test-token',
        user: { id: 1, name: 'Test User', email: 'test@example.com' }
      }
    };

    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const result = await authAPI.login('test@example.com', 'password');

    expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'test@example.com',
      password: 'password'
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should register user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      role: 'patient'
    };

    const mockResponse = {
      data: {
        token: 'test-token',
        user: { id: 1, ...userData }
      }
    };

    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const result = await authAPI.register(userData);

    expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/register', userData);
    expect(result).toEqual(mockResponse.data);
  });

  it('should verify token successfully', async () => {
    const mockResponse = {
      data: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'patient'
      }
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await authAPI.verifyToken('test-token');

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/auth/verify', {
      headers: { Authorization: 'Bearer test-token' }
    });
    expect(result).toEqual(mockResponse.data);
  });
});