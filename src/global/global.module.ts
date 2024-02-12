import { HttpModule, HttpModuleAsyncOptions } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

const httpModuleOptions: HttpModuleAsyncOptions = {
  useFactory: () => ({
    baseURL: 'https://yfapi.net/v6',
    headers: {
      'X-API-KEY': process.env.API_KEY,
    },
  }),
};

const mongooseModuleOptions: MongooseModuleAsyncOptions = {
  useFactory: () => ({
    uri: process.env.MONGODB_URI,
  }),
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(mongooseModuleOptions),
    HttpModule.registerAsync(httpModuleOptions),
  ],
  exports: [HttpModule],
})
export class GlobalModule {}
