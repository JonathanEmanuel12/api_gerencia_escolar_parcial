'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.string('numero_sala', 4).notNullable()
      table.integer('capacidade_alunos').notNullable()
      table.boolean('disponibilidade').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
