'use strict'

const User = require("../../Models/User")

class ProfessorController {

    UserController = use('App/Controllers/Http/UserController')
    userController = new this.UserController()

    async buscarProfessor ({ params }) {
        const isProfessor = true
        return await this.userController.buscarUsuario(params.matricula, isProfessor)
    }

    async cadastrarProfessor ({ request }) {
        const body = request.post()
        const isProfessor = true
        this.userController.cadastrarUsuario(body, isProfessor)
    }

    async editarProfessor ({ request, params }) {
        const body = request.post()
        this.userController.editarUsuario(body, params.matricula)
    }

    async deletarProfessor ({ params }) {
        this.userController.deletarUsuario(params.matricula)
    }

}

module.exports = ProfessorController
