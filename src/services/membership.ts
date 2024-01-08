import { inject, injectable } from 'inversify';
import type { HttpServiceInterface, MembershipServiceInterface } from './interface';
import { TYPES } from './TYPES';
import { Settings } from 'config';

@injectable()
class MembershipService implements MembershipServiceInterface {

  constructor(
    @inject(TYPES.HttpServiceInterface) private httpService: HttpServiceInterface
  ) {}

  public async register(username: string, password: string): Promise<string> {
    const apiUrl = `${Settings.base_api_url}/register`;
    const response = await this.httpService.sendRequest<string>({
      method: 'post',
      url: apiUrl,
      data: { username, password },
    });

    return response.data;
  }

  public async login(username: string, password: string): Promise<string> {
    const apiUrl = `${Settings.base_api_url}/login`;
    const response = await this.httpService.sendRequest<string>({
      method: 'post',
      url: apiUrl,
      data: { username, password },
    });

    return response.data;
  }

  public async getProfile(userId: string): Promise<any> {
    const apiUrl = `${Settings.base_api_url}/profile/${userId}`;
    const response = await this.httpService.sendRequest<any>({
      method: 'get',
      url: apiUrl,
    });

    return response.data;
  }

  public async updateProfile(profileData: any): Promise<void> {
    const apiUrl = `${Settings.base_api_url}/profile/update`;
    await this.httpService.sendRequest<void>({
      method: 'put',
      url: apiUrl,
      data: profileData,
    });
  }

  public async updateAvatar(avatarUrl: string): Promise<void> {
    const apiUrl = `${Settings.base_api_url}/avatar/image`;
    await this.httpService.sendRequest<void>({
      method: 'put',
      url: apiUrl,
      data: { avatarUrl },
    });
  }
}

export default MembershipService;