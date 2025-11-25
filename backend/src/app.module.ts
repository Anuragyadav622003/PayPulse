import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'logger-service';
@Module({
  imports: [
    LoggerModule.forRoot({
      serviceName:'PayPulseBakend',
      level:'debug'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
