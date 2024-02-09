import { Controller, Get, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { FindQuotes } from './quote.dto';
import { FindQuotesResponse } from './quote.interface';

@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @Get()
  async findQuotes(@Query() query: FindQuotes): Promise<FindQuotesResponse> {
    const { symbols } = query;
    return this.quoteService.findQuotes(symbols);
  }
}
