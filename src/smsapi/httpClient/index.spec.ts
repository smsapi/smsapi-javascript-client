/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from './index';

// Mock fetch globally
global.fetch = jest.fn();

describe('HttpClient', () => {
  let httpClient: HttpClient;
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    httpClient = new HttpClient('https://api.example.com');
    mockFetch.mockClear();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('constructor', () => {
    it('should initialize with default values', () => {
      // when
      const client = new HttpClient('https://api.example.com');

      // then
      expect(client).toBeInstanceOf(HttpClient);
    });

    it('should remove trailing slash from baseUrl', () => {
      // when
      const client = new HttpClient('https://api.example.com/');
      expect(client['baseUrl']).toBe('https://api.example.com');
    });

    it('should set default headers with custom headers', () => {
      // given
      const customHeaders = { Authorization: 'Bearer token' };

      // when
      const client = new HttpClient('https://api.example.com', customHeaders);

      // then
      expect(client['defaultHeaders']).toEqual({
        Authorization: 'Bearer token',
        'Content-Type': 'application/json',
      });
    });
  });

  describe('GET requests', () => {
    it('should make successful GET request', async () => {
      // given
      const mockResponse = {
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValue({ data: { id: 1, name: 'test' } }),
        ok: true,
        status: 200,
        statusText: 'OK',
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      // when
      const result = await httpClient.get('/users');

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        }),
      );
      expect(result).toEqual({ data: { id: 1, name: 'test' } });
    });

    it('should handle non-JSON response', async () => {
      // given
      const mockResponse = {
        headers: new Headers({ 'content-type': 'text/plain' }),
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue('plain text response'),
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      // when
      const result = await httpClient.get('/users');

      // then
      expect(result).toBe('plain text response');
    });
  });

  describe('POST requests', () => {
    it('should make successful POST request with body', async () => {
      // given
      const mockResponse = {
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValue({ data: { id: 1 } }),
        ok: true,
        status: 201,
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const body = { name: 'test user' };

      // when
      await httpClient.post('/users', body);

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }),
      );
    });
  });

  describe('PUT requests', () => {
    it('should make successful PUT request', async () => {
      // given
      const mockResponse = {
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValue({ data: { id: 1 } }),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const body = { name: 'updated user' };

      // when
      await httpClient.put('/users/1', body);

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          body: JSON.stringify(body),
          method: 'PUT',
        }),
      );
    });
  });

  describe('PATCH requests', () => {
    it('should make successful PATCH request', async () => {
      // given
      const mockResponse = {
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValue({ data: { id: 1 } }),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      const body = { name: 'patched user' };

      // when
      await httpClient.patch('/users/1', body);

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          body: JSON.stringify(body),
          method: 'PATCH',
        }),
      );
    });
  });

  describe('DELETE requests', () => {
    it('should make successful DELETE request', async () => {
      // given
      const mockResponse = {
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValue({}),
        ok: true,
        status: 204,
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      // when
      await httpClient.delete('/users/1');

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
    });
  });

  describe('error handling', () => {
    it('should handle network errors', async () => {
      // given
      mockFetch.mockRejectedValue(new Error('Network error'));

      // then
      await expect(httpClient.get('/users')).rejects.toThrow('Network error');
    });
  });

  describe('request options', () => {
    it('should handle query parameters', async () => {
      // given
      const mockResponse = {
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValue({ data: {} }),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      // when
      await httpClient.get('/users', {
        params: { page: 1, search: 'test' },
      });

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users?page=1&search=test',
        expect.any(Object),
      );
    });

    it('should not include body for GET requests', async () => {
      // given
      const mockResponse = {
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValue({ data: {} }),
        ok: true,
        status: 200,
      };
      mockFetch.mockResolvedValue(mockResponse as any);

      // when
      await httpClient.get('/users');

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.not.objectContaining({
          body: expect.anything(),
        }),
      );
    });
  });
});
