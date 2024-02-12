import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuoteService } from './quote.service';
import { FindQuotesDto } from './dto/quote.dto';

@ApiTags('quotes')
@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch quotes data. Max 10 items' })
  async findQuotes(@Query() query: FindQuotesDto) {
    const { symbols } = query;
    return this.quoteService.findQuotes(symbols);
  }
}
