import { inject, injectable } from 'inversify';
import type { HttpServiceInterface, InformationServiceInterface } from './interface';
import { Settings } from 'config';
import { Banner, Service } from 'types/entites';
import { TYPES } from './TYPES';

@injectable()
class InformationService implements InformationServiceInterface {

  constructor(
    @inject(TYPES.HttpServiceInterface) private httpService: HttpServiceInterface
  ) {}

  public async getBanner(): Promise<Banner[]> {
    const apiUrl = `${Settings.base_api_url}/banner`;
    const response = await this.httpService.sendRequest<Banner[]>({
      method: 'get',
      url: apiUrl,
    });

    return response.data;
  }

  public async getServices(): Promise<Service[]> {
    const apiUrl = `${Settings.base_api_url}/services`;
    const response = await this.httpService.sendRequest<Service[]>({
      method: 'get',
      url: apiUrl,
    });

    return response.data;
  }
}

export default InformationService;