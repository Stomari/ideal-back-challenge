import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AddAssetDto, CreateUserDto, GetUserAssetsDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUserAssets(@Query() getUserAssetsDto: GetUserAssetsDto) {
    const { user } = getUserAssetsDto;
    return this.userService.getUserAssets(user);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { user } = createUserDto;
    return this.userService.createUser(user);
  }

  @Post('asset')
  async addAsset(@Body() addAssetDto: AddAssetDto) {
    const { user, symbol } = addAssetDto;
    return this.userService.addAsset(user, symbol);
  }
}
