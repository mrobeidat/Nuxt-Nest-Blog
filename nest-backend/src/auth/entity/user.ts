import { Article } from '../../articles/entities/article.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
    role: UserRole;

    @OneToMany(() => Article, (article) => article.user) // User has many articles
    articles: Article[];
}