import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), ProductModule, MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('DATABASE_URL'), // Loaded from .ENV
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
