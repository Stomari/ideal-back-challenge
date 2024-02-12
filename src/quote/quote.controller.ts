import { Controller, Get, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { FindQuotes } from './quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @Get()
  async findQuotes(@Query() query: FindQuotes) {
    const { symbols } = query;
    return this.quoteService.findQuotes(symbols);
  }
}
