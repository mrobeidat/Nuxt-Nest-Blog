import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ArticlesService {

  constructor(@InjectRepository(Article) private articleRepository: Repository<Article>) { }

  async createArticle(article: CreateArticleDto): Promise<void> {
    const newArticle = new Article();
    newArticle.text = article.text;
    newArticle.title = article.title;
    newArticle.description = article.description;
    newArticle.userId = article.userId;
    newArticle.categoryId = article.categoryId;
    await this.articleRepository.save(newArticle);
  }

  async getArticles(): Promise<Article[]> {
    return await this.articleRepository.find({
      relations: ['category'],
    })
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Article>> {
    return await paginate<Article>(this.articleRepository, options);
  }

  async findOneArticle(id: number): Promise<Article> {
    return await this.articleRepository.findOneOrFail(
      { where: { id }, relations: ['category'] }
    )
  }

  async updateArticle(id: number, updateArticleDto: UpdateArticleDto): Promise<void> {
    await this.articleRepository.update({ id }, updateArticleDto);
  }

  async removeArticle(id: number): Promise<void> {
    await this.articleRepository.delete({ id });
  }
}
