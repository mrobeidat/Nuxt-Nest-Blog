import { Category } from "../entities/category.entity";

export class CreateArticleDto {
    title: string;
    description?: string;
    text?: string;
    category: Category;
}
