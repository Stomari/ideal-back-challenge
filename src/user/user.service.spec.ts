import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { QuoteService } from '../quote/quote.service';
import { GlobalModule } from '../global/global.module';
import { Model } from 'mongoose';

describe('UserService', () => {
  let userService: UserService;
  let quoteService: QuoteService;
  let userModel: Model<User>;

  const modelMock = {
    new: jest.fn(),
    constructor: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
    exec: jest.fn(),
  };

  const mockedQuotes = [
    { symbol: 'AAPL', bid: 100 },
    { symbol: 'TSLA', bid: 300 },
    { symbol: 'GOOGL', bid: 60 },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: modelMock,
        },
      ],
      imports: [GlobalModule],
    })
      .useMocker((token) => {
        if (token === QuoteService) {
          return { findQuotes: jest.fn().mockResolvedValue([{}]) };
        }
      })
      .compile();

    userService = module.get<UserService>(UserService);
    quoteService = module.get<QuoteService>(QuoteService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create an user', async () => {
    const mockedUser = { name: 'John Doe', assets: [] };

    jest
      .spyOn(userModel, 'create')
      .mockImplementation(() => Promise.resolve(mockedUser as any));

    const result = await userService.createUser('John Doe');

    expect(result).toEqual(mockedUser);
  });

  it('should add an asset to an user', async () => {
    const userName = 'John Doe';
    const asset = 'AAPL';

    jest
      .spyOn(userModel, 'findOneAndUpdate')
      .mockResolvedValue({ name: userName, assets: [asset] });

    const result = await userService.addAsset(userName, asset);

    expect(result).toEqual({ name: userName, assets: [asset] });
  });

  it('should throw an error if asset is not found', async () => {
    try {
      const userName = 'John Doe';
      const asset = 'TEST';

      jest.spyOn(quoteService, 'findQuotes').mockResolvedValue([]);

      await userService.addAsset(userName, asset);
    } catch (error) {
      expect(error.message).toMatch('Asset not found!');
    }
  });

  it('should throw an error if user is not found when adding an asset', async () => {
    try {
      const userName = 'John Doe';
      const asset = 'TEST';

      jest.spyOn(userModel, 'findOneAndUpdate').mockResolvedValue({});

      await userService.addAsset(userName, asset);
    } catch (error) {
      expect(error.message).toMatch('User not found!');
    }
  });

  it('should fetch user assets', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce({
      name: 'John Doe',
      assets: ['AAPL', 'TSLA', 'GOOGL'],
    });

    jest
      .spyOn(quoteService, 'findQuotes')
      .mockImplementationOnce(() => Promise.resolve(mockedQuotes as any));

    const result = await userService.getUserAssets('John Doe');

    expect(result).toEqual(mockedQuotes);
  });

  it('should fetch user assets sorted', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue({
      name: 'John Doe',
      assets: ['AAPL', 'TSLA', 'GOOGL'],
    });

    jest
      .spyOn(quoteService, 'findQuotes')
      .mockImplementation(() => Promise.resolve(mockedQuotes as any));

    const resultAlphaAsc = await userService.getUserAssets(
      'John Doe',
      'alphabetical',
      'asc',
    );
    const resultAlphaDesc = await userService.getUserAssets(
      'John Doe',
      'alphabetical',
      'desc',
    );
    const resultPriceAsc = await userService.getUserAssets(
      'John Doe',
      'price',
      'asc',
    );
    const resultPriceDesc = await userService.getUserAssets(
      'John Doe',
      'price',
      'desc',
    );

    expect(resultAlphaAsc).toEqual([
      { symbol: 'AAPL', bid: 100 },
      { symbol: 'GOOGL', bid: 60 },
      { symbol: 'TSLA', bid: 300 },
    ]);
    expect(resultAlphaDesc).toEqual([
      { symbol: 'TSLA', bid: 300 },
      { symbol: 'GOOGL', bid: 60 },
      { symbol: 'AAPL', bid: 100 },
    ]);
    expect(resultPriceAsc).toEqual([
      { symbol: 'GOOGL', bid: 60 },
      { symbol: 'AAPL', bid: 100 },
      { symbol: 'TSLA', bid: 300 },
    ]);
    expect(resultPriceDesc).toEqual([
      { symbol: 'TSLA', bid: 300 },
      { symbol: 'AAPL', bid: 100 },
      { symbol: 'GOOGL', bid: 60 },
    ]);
  });

  it('should throw an error if user is not found when fetching user assets', async () => {
    try {
      const userName = 'John Doe';

      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      await userService.getUserAssets(userName);
    } catch (error) {
      expect(error.message).toMatch('User not found!');
    }
  });

  it('should change asset order', async () => {
    jest.spyOn(userModel, 'findOne').mockImplementation(
      () =>
        ({
          name: 'John Doe',
          assets: ['AAPL', 'GOOGL', 'TSLA', 'AAP'],
          save() {
            return this;
          },
        }) as any,
    );

    const result = await userService.changeAssetOrder('John Doe', 0, 3);

    expect(result.assets).toEqual(['GOOGL', 'TSLA', 'AAP', 'AAPL']);
  });
});
