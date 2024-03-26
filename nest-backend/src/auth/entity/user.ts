import { Article } from '../../articles/entities/article.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

// @Entity({ name: 'user' })
// export class User {
//     @PrimaryColumn()
//     email: string;

//     @Column({ nullable: false })
//     password: string;

//     @Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
//     role: UserRole;

//     @OneToMany(() => Article, (article) => article.user) // User has many articles
//     articles: Article[];
// }