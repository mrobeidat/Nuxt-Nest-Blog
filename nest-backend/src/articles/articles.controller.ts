import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { RoleGuard } from 'src/auth/guard/authorization.guard';
import { Role } from 'src/auth/decorators/role';
import { UserRole } from 'src/auth/entity/user';

@Controller('articles')
export class ArticlesController {
  constructor(public articlesService: ArticlesService) { }

  @Get()
  async getArticles(@Query('page') page: number = 1, @Query('limit') limit: number = 100) {
    const paginationOptions = {
      page,
      limit,
    };
    return await this.articlesService.paginate(paginationOptions);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.createArticle(createArticleDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('file')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      file: file?.buffer.toString(),
    };
  }

  @Get('/:id')
  findOneArticle(@Param('id') id: string) {
    return this.articlesService.findOneArticle(+id);
  }

  @Patch('/:id')
  updateArticle(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.updateArticle(+id, updateArticleDto);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete('/:id')
  removeArticle(@Param('id') id: string) {
    return this.articlesService.removeArticle(+id);
  }
}
