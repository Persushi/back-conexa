import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserServiceModule } from './user-service/user-service.module';
import { FilmServiceModule } from './film-service/film-service.module';
import { AuthModule } from './auth-service/auth-service.module';

const config: TypeOrmModuleOptions = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "localdb",
  "entities": [
    "dist/**/*.entity{.ts,.js}"
  ],
  "synchronize": true
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(config),
    UserServiceModule,
    FilmServiceModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
