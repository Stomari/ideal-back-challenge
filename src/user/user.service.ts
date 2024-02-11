import { BadRequestException, Injectable } from '@nestjs/common';
import { QuoteService } from '../quote/quote.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private quoteService: QuoteService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createUser(user: string) {
    const model = new this.userModel({ name: user, assets: [] });
    return model.save();
  }

  async addAsset(user: string, symbol: string) {
    // checks if symbols exists
    const quote = await this.quoteService.findQuotes(symbol);

    if (!quote.quoteResponse.result.length) {
      throw new BadRequestException('Asset not found!');
    }

    const update = await this.userModel.findOneAndUpdate(
      { name: user },
      { $addToSet: { assets: symbol } },
      { new: true },
    );

    if (!update) {
      throw new BadRequestException('User not found!');
    }

    return update;
  }
}
