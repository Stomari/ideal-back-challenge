import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { QuoteService } from './quote.service';
import { of, throwError } from 'rxjs';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { GlobalModule } from '../global/global.module';

describe('QuoteService', () => {
  let quoteService: QuoteService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteService],
      imports: [GlobalModule],
    }).compile();

    quoteService = module.get<QuoteService>(QuoteService);
    httpService = module.get<HttpService>(HttpService);
    jest.useFakeTimers();
  });

  it('should be defined', () => {
    expect(quoteService).toBeDefined();
  });

  it('should successfully call findQuotes', async () => {
    const symbol = 'AAPL';
    const data = { quoteResponse: { result: [{ symbol }] } };

    const response: AxiosResponse<any> = {
      data,
      headers: {},
      config: {
        url: 'http://localhost:3000/mockUrl',
      } as InternalAxiosRequestConfig,
      status: 200,
      statusText: 'OK',
    };

    const httpServiceSpy = jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => of(response));

    const result = await quoteService.findQuotes(symbol);

    expect(httpServiceSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ symbol }]);
  });

  it('should throw error on findQuotes error', async () => {
    try {
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() =>
          throwError(() => ({ response: { data: 'Error' } })),
        );

      await quoteService.findQuotes('AAPL');
    } catch (error) {
      expect(error).toMatch('An error happened!');
    }
  });
});
