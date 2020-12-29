import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clippers extends BaseSchema {
  protected tableName = 'clippers'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('user_id')
    })
  }
}
