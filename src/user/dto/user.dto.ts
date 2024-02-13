import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

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

export class ChangeAssetOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User which you want to modify' })
  user: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ description: 'Asset index that you want to move' })
  indexFrom: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ description: 'Index that you want the asset to go' })
  indexTo: number;
}
