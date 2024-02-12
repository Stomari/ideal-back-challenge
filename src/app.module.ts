import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './quote/quote.module';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [GlobalModule, QuoteModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
