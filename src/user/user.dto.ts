import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserAssetsDto {
  @IsString()
  @IsNotEmpty()
  user: string;
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
