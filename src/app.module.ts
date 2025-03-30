import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MessagingModule } from './messaging/messaging.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      dbName: process.env.DB_NAME,
    }),
    UserModule, 
    MessagingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
