import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable().unique()
      table.uuid('uuid')
      table.string('code')
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()
      table
        .integer('created_by')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
