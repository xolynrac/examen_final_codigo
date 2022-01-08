import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1641615392951 implements MigrationInterface {
    name = 'Initial1641615392951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`clienteName\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`first_name\` varchar(75) NULL`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`last_name\` varchar(75) NULL`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`dni\` varchar(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`state\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`created_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`created_by\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`updated_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`updated_by\` bigint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`updated_by\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`dni\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`clientes\` ADD \`clienteName\` varchar(150) NULL DEFAULT 'NULL'`);
    }

}
