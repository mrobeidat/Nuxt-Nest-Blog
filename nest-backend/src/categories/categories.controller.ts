import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(public categoriesService: CategoriesService) { }

  @Get()
  async getCategories(@Query('page') page: number = 1, @Query('limit') limit: number = 2) {
    const paginationOptions = {
      page,
      limit,
    };
    return await this.categoriesService.paginate(paginationOptions);
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get('/:id')
  findOneCategory(@Param('id') id: string) {
    return this.categoriesService.findOneCategory(+id);
  }

  @Patch('/:id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @Delete('/:id')
  removeCategory(@Param('id') id: string) {
    return this.categoriesService.removeCategory(+id);
  }
}
