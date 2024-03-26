import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Module({
    controllers: [ArticlesController],
    providers: [ArticlesService],
    imports: [TypeOrmModule.forFeature([Article])],
    exports: [TypeOrmModule],
})
export class ArticleModule { }
