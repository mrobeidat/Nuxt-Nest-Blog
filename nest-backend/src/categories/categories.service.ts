import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

  async createCategory(category: CreateCategoryDto): Promise<void> {
     
   const  newCategory = await this.categoryRepository.create({ ...category });
    await this.categoryRepository.save(newCategory);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
  async paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
    return await paginate<Category>(this.categoryRepository, options);
  }
  async findOneCategory(id: number): Promise<Category> {
    return await this.categoryRepository.findOneOrFail({ where: { id } })
  }

  async updateCategory(id: number, updateArticleDto: UpdateCategoryDto): Promise<void> {
    await this.categoryRepository.update({ id }, updateArticleDto)
  }

  async removeCategory(id: number): Promise<void> {
    await this.categoryRepository.delete({ id })
  }
}
