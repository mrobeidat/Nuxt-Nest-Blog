import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './articles/entities/category.entity';
import { Article } from './articles/entities/article.entity';
import { ArticleModule } from './articles/articles.module';
import { CategoryModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArticleModule,
    CategoryModule,
    MulterModule.register({
      storage: './uploads'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Category, Article],
        synchronize: false,
      })
    }),
    TypeOrmModule.forFeature([Article, Category]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

