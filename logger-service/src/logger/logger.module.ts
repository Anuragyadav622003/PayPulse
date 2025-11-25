import { Module, DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerConfig } from './logger.config';

@Module({})
export class LoggerModule {
  static forRoot(config: LoggerConfig): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useFactory: () => new LoggerService(config),
        },
      ],
      exports: [LoggerService],
    };
  }
}
