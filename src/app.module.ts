import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule, HttpModuleAsyncOptions } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteController } from './quote/quote.controller';
import { QuoteService } from './quote/quote.service';

const httpModuleOptions: HttpModuleAsyncOptions = {
  useFactory: () => ({
    baseURL: 'https://yfapi.net/v6',
    headers: {
      'X-API-KEY': process.env.API_KEY,
    },
  }),
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.registerAsync(httpModuleOptions),
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [AppController, QuoteController],
  providers: [AppService, QuoteService],
})
export class AppModule {}
