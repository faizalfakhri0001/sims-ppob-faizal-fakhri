import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Banner, Service } from "types/entites";

export interface HttpServiceInterface {
  sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

export interface ApiServiceInterface {
  fetchData(url: string): Promise<any>;
}

export interface MembershipServiceInterface {
  register(username: string, password: string): Promise<string>;
  login(username: string, password: string): Promise<string>;
  getProfile(userId: string): Promise<any>;
  updateProfile(userId: string, profileData: any): Promise<void>;
  updateAvatar(userId: string, avatarUrl: string): Promise<void>;
}

export interface InformationServiceInterface {
  getBanner(): Promise<Banner[]>;
  getServices(): Promise<Service[]>;
}