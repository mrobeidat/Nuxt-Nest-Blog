import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class ArticleMigration1711368225391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'article',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'text',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'categoryId',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    }

                ],
            }),
        );

        await queryRunner.createForeignKey(
            'article',
            new TableForeignKey({
                columnNames: ['categoryId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'category',
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('article');
    }
}

