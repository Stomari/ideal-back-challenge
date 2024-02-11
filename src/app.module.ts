import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './quote/quote.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GlobalModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
