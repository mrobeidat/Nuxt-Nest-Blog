import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "../../articles/entities/article.entity";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name?: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Article, article => article.category, { cascade: true, eager: true })
    articles?: Article[]
}