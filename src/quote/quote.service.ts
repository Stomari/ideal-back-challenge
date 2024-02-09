import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { FindQuotesResponse } from './quote.interface';

@Injectable()
export class QuoteService {
  private readonly logger = new Logger(QuoteService.name);
  constructor(private readonly httpService: HttpService) {}

  async findQuotes(symbols: string): Promise<FindQuotesResponse> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<FindQuotesResponse>('/finance/quote', {
          params: {
            region: 'US',
            lang: 'en',
            symbols,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
