// article.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../categories/entity/category.entity";
import { User } from "../../auth/entity/user"; // Adjust the path as needed

@Entity('articles')
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title?: string

    @Column()
    description?: string

    @Column()
    text?: string

    @Column()
    userId: number

    @Column()
    categoryId?: number

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.articles)
    @JoinColumn({name:'categoryId'})
    category: Category[];

    @ManyToOne(() => User, user => user.articles)
    @JoinColumn({name:'userId'})
    user: User;
}
