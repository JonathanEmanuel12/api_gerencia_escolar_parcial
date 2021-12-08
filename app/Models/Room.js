'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Room extends Model {

    static get hidden () {
        return ['id', 'professor_id', 'created_at', 'updated_at']
    }
}

module.exports = Room
