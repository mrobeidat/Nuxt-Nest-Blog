import { User } from "src/auth/entity/user";
import { Category } from "../../categories/entity/category.entity";

export class CreateArticleDto {
    title: string;
    description: string;
    text: string;
    categoryId: number;
    userId: number;

}
