import { HttpModule, HttpModuleAsyncOptions } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const httpModuleOptions: HttpModuleAsyncOptions = {
  useFactory: () => ({
    baseURL: 'https://yfapi.net/v6',
    headers: {
      'X-API-KEY': process.env.API_KEY,
    },
  }),
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/ideal-back-challenge'),
    HttpModule.registerAsync(httpModuleOptions),
  ],
  exports: [HttpModule],
})
export class GlobalModule {}
