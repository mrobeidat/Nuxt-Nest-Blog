import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/articles/entities/category.entity';

@Module({
    controllers: [CategoryController],
    providers: [CategoriesService],
    imports: [TypeOrmModule.forFeature([Category])],
    exports: [TypeOrmModule]
})
export class CategoryModule { }
