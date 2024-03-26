import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Category } from 'src/articles/entities/category.entity';
import { Article } from 'src/articles/entities/article.entity';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [Category, Article],
    migrations: ['src/migrations/*'],
    logging: true,
    dropSchema: true,
});

// export default new DataSource({
//     type: 'postgres',
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "postgres",
//     database: "blogs",
//     logging:true,
//     entities: [Category, Article],
//     migrations: ['src/migrations/*'],
//     dropSchema: true,
// });
