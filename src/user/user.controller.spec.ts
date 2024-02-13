import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import {
  AddAssetDto,
  ChangeAssetOrderDto,
  CreateUserDto,
  GetUserAssetsDto,
} from './dto/user.dto';
import { GlobalModule } from '../global/global.module';
import { QuoteService } from '../quote/quote.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const modelMock = {
    new: jest.fn(),
    constructor: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: modelMock,
        },
      ],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            getUserAssets: jest.fn().mockResolvedValue({}),
            createUser: jest.fn().mockResolvedValue({}),
            addAsset: jest.fn().mockResolvedValue({}),
            changeAssetOrder: jest.fn().mockResolvedValue({}),
          };
        }
        if (token === GlobalModule || token === QuoteService) {
          return {};
        }
      })
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getUserAssets', async () => {
    const spy = jest.spyOn(userService, 'getUserAssets');

    const mockQuery: GetUserAssetsDto = {
      user: 'John Doe',
      sort: 'price',
      direction: 'desc',
    };

    await controller.getUserAssets(mockQuery);

    expect(spy).toHaveBeenCalledWith(
      mockQuery.user,
      mockQuery.sort,
      mockQuery.direction,
    );
  });

  it('should call createUser', async () => {
    const spy = jest.spyOn(userService, 'createUser');

    const mockParam: CreateUserDto = {
      user: 'John Doe',
    };

    await controller.createUser(mockParam);

    expect(spy).toHaveBeenCalledWith(mockParam.user);
  });

  it('should call addAsset', async () => {
    const spy = jest.spyOn(userService, 'addAsset');

    const mockParam: AddAssetDto = {
      user: 'John Doe',
      symbol: 'AAPL',
    };

    await controller.addAsset(mockParam);

    expect(spy).toHaveBeenCalledWith(mockParam.user, mockParam.symbol);
  });

  it('should call changeAssetOrder', async () => {
    const spy = jest.spyOn(userService, 'changeAssetOrder');

    const mockParam: ChangeAssetOrderDto = {
      user: 'John Doe',
      indexFrom: 0,
      indexTo: 3,
    };

    await controller.changeAssetOrder(mockParam);

    expect(spy).toHaveBeenCalledWith(
      mockParam.user,
      mockParam.indexFrom,
      mockParam.indexTo,
    );
  });
});
