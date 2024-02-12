import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindQuotesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Multiple symbols separated by commas. Max is 10',
    example: 'AAPL,AAP,TSLA',
  })
  symbols: string;
}
