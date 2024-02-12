import { BadRequestException, Injectable } from '@nestjs/common';
import { QuoteService } from '../quote/quote.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Quote } from '../quote/entities/quote.entity';

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

    if (!quote.length) {
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

  async getUserAssets(
    user: string,
    sort?: 'price' | 'alphabetical',
    direction?: 'asc' | 'desc',
  ) {
    const dbResult = await this.userModel.findOne({ name: user });

    if (!dbResult) {
      throw new BadRequestException('User not found!');
    }

    const assetsData = await this.fetchQuotes(dbResult.assets);

    if (sort) {
      this.sortAssets(assetsData, sort, direction);
    }

    return assetsData;
  }

  /**
   * Receives a list of assets from the user and returns them with data
   */
  private async fetchQuotes(assets: string[]) {
    // split assets in chunks of 10 since the quotes api has a max of 10 items
    const chunks = Array.from(
      { length: Math.ceil(assets.length / 10) },
      (elem, index) => assets.slice(index * 10, index * 10 + 10),
    );

    const assetsWithData: Quote[] = [];

    // create promises array for Promise.all
    const promises = chunks.map((elem) =>
      this.quoteService.findQuotes(elem.join()),
    );

    // pull all data and push the assets to a new array
    await Promise.all(promises).then((result) => {
      result.forEach((elem) => {
        assetsWithData.push(...elem);
      });
    });

    return assetsWithData;
  }

  private sortAssets(
    assets: Quote[],
    sort: 'price' | 'alphabetical',
    direction?: 'asc' | 'desc',
  ) {
    if (sort === 'alphabetical') {
      if (!direction || direction === 'asc') {
        assets.sort((a, b) => a.symbol.localeCompare(b.symbol));
        return;
      }
      assets.sort((a, b) => b.symbol.localeCompare(a.symbol));
      return;
    }
    if (sort === 'price') {
      if (!direction || direction === 'asc') {
        assets.sort((a, b) => a.bid - b.bid);
        return;
      }
      assets.sort((a, b) => b.bid - a.bid);
      return;
    }
  }
}
