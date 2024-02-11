import { HttpModule, HttpModuleAsyncOptions } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

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
  imports: [HttpModule.registerAsync(httpModuleOptions)],
  exports: [HttpModule],
})
export class GlobalModule {}
