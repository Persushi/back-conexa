import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceModule } from './user-service/user-service.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    entities: [
    ],
    synchronize: true,
    logging: true,
  }), UserServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
