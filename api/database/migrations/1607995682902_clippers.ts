import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clippers extends BaseSchema {
  protected tableName = 'clippers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title', 255).notNullable()
      table.text('content').notNullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
