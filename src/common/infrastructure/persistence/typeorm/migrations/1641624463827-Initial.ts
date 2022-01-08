import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1641624463827 implements MigrationInterface {
    name = 'Initial1641624463827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`clientes\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NULL, \`last_name\` varchar(75) NULL, \`dni\` varchar(8) NOT NULL, \`state\` int NOT NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`clientes\``);
    }

}
