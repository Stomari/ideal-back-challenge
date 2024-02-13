import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { GlobalModule } from '../global/global.module';

describe('QuoteController', () => {
  let quoteController: QuoteController;
  let quoteService: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [QuoteService],
      imports: [GlobalModule],
    }).compile();

    quoteController = module.get<QuoteController>(QuoteController);
    quoteService = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(quoteController).toBeDefined();
  });

  it('should call findQuotes', async () => {
    const quoteServiceSpy = jest
      .spyOn(quoteService, 'findQuotes')
      .mockImplementation(jest.fn());

    quoteController.findQuotes({ symbols: 'AAPL' });

    expect(quoteServiceSpy).toHaveBeenCalledWith('AAPL');
  });
});
