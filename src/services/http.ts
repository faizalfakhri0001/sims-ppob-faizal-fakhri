import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpServiceInterface } from './interface';
import { injectable } from 'inversify';

@injectable()
class HttpService implements HttpServiceInterface  {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();

    // Add the request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Set the Authorization header dynamically
        // const token = await getToken();
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        config.headers['Content-Type'] = 'application/json'
        return config;
      },
      (error) => {
        // Handle request error
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );
  }
    
  public async sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response;
    } catch (error) {
      throw new Error(`HTTP request failed: ${error}`);
    }
  }
}

export default HttpService;
