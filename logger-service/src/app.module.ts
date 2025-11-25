import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [LoggerModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
