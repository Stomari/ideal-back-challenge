import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AddAssetDto, CreateUserDto, GetUserAssetsDto } from './dto/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetch user assets. Can be sorted',
    description: 'Sorting by price uses `bid` for comparison',
  })
  async getUserAssets(@Query() getUserAssetsDto: GetUserAssetsDto) {
    const { user, direction, sort } = getUserAssetsDto;
    return this.userService.getUserAssets(user, sort, direction);
  }

  @Post()
  @ApiOperation({
    summary: 'Create an user. User name is unique',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { user } = createUserDto;
    return this.userService.createUser(user);
  }

  @Post('asset')
  @ApiOperation({ summary: 'Add one asset to a specific user' })
  async addAsset(@Body() addAssetDto: AddAssetDto): Promise<User> {
    const { user, symbol } = addAssetDto;
    return this.userService.addAsset(user, symbol);
  }
}
