import { MigrationInterface, QueryRunner, Table } from "typeorm";

//----------------------------------------------------------------

export class CreateServicesTable1710158929899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable(
        new Table({
            name: "services",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "service_name",
                type: "varchar",
                length: "255",
              },
              {
                name: "description",
                type: "text",
              },
            ],
          }),
        true
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("services");

    }

}
