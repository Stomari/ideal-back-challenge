import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUserAssetsDto {
  @IsString()
  @IsNotEmpty()
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
  user: string;
}

export class AddAssetDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;
}
