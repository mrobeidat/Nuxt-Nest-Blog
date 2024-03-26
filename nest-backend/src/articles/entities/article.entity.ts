import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title?: string

    @Column()
    description?: string

    @Column()
    text?: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.articles)
    category: Category;

}
