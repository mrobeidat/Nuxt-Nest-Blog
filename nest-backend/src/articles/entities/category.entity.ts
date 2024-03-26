import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name?: string

    // @CreateDateColumn({ name: 'created_at' })
    // createdAt: Date;

    // @UpdateDateColumn({ name: 'updated_at' })
    // updatedAt: Date;

    @OneToMany(() => Article, article => article.category, { cascade: true, eager: true })
    articles?: Article[]
}