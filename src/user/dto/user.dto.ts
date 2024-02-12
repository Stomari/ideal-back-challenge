import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUserAssetsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  user: string;

  @IsIn(['price', 'alphabetical'])
  @IsOptional()
  sort?: 'price' | 'alphabetical';

  @IsIn(['asc', 'desc'])
  @IsOptional()
  direction?: 'asc' | 'desc';
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  user: string;
}

export class AddAssetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  user: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Stock symbol' })
  symbol: string;
}
