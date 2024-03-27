import { MigrationInterface, QueryRunner, Table } from "typeorm";

//----------------------------------------------------------------

export class CreateUsersTable1710158908486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
      await queryRunner.createTable(
          new Table({
            name: "users",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "first_name",
                type: "varchar",
                length: "255",
              },
              {
                name: "last_name",
                type: "varchar",
                length: "255",
                isNullable: true,
              },
              {
                name: "email",
                type: "varchar",
                length: "255",
                isUnique: true,
              },
              {
                name: "password",
                type: "varchar",
                length: "255",
              },
              {
                name: "is_active",
                type: "boolean",
                default: true,
              },
              {
                name: "role_id",
                type: "int",
              },
            ],
            foreignKeys: [
              {
                columnNames: ["role_id"],
                referencedTableName: "roles",
                referencedColumnNames: ["id"],
              },
            ],
          }),
        true
     );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
  
        await queryRunner.dropTable("users");

    }

}
