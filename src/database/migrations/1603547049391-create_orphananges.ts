import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphananges1603547049391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(new Table({
           name: 'orphananges',
           columns: [
               {
                   name: 'id',
                   type: 'integer',
                   unsigned: true,
                   isPrimary: true,
                   isGenerated: true,
                   generationStrategy: 'increment'
               },
               {
                   name: 'name',
                   type: 'varchar'
               },
               {
                   name: 'latitude',
                   type: 'decimal',
                   scale: 10,
                   precision: 2
               },
               {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
               },
               {
                   name: 'about',
                   type: 'text',
               },
               {
                   name: 'open_on_weekends',
                   type: 'boolean',
                   default: false
               }
           ]
       })) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphananges');  
    }

}
