import { inject } from 'inversify';
import type { ApiServiceInterface, HttpServiceInterface } from './interface';

class ApiService implements ApiServiceInterface {

  constructor(
    @inject('HttpServiceInterface') private httpService: HttpServiceInterface
  ) {}

  public async fetchData(url: string): Promise<any> {
    const response = await this.httpService.sendRequest({
      method: 'get',
      url,
    });

    return response.data;
  }
}

export default ApiService;
