import { IsNotEmpty, IsString } from 'class-validator';

export class FindQuotes {
  @IsString()
  @IsNotEmpty()
  symbols: string;
}
