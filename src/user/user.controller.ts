import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AddAssetDto, CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
