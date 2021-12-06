'use strict'

const User = require("../../Models/User")

class ProfessorController {

    UserController = use('App/Controllers/Http/UserController')
    userController = new this.UserController()

    async autenticarProfessor ({ request, auth }) {
        return await this.userController.autenticarUsuario(request.post(), auth)
    }

    async buscarProfessor ({ params, auth}) {
        const isProfessor = true
        return await this.userController.buscarUsuario(params.matricula, isProfessor, auth.user)
    }

    async cadastrarProfessor ({ request }) {
        const body = request.post()
        const isProfessor = true
        this.userController.cadastrarUsuario(body, isProfessor)
    }

    async editarProfessor ({ request, params, auth }) {
        const body = request.post()
        this.userController.editarUsuario(body, params.matricula, auth.user)
    }

    async deletarProfessor ({ params, auth }) {
        this.userController.deletarUsuario(params.matricula, auth.user)
    }

}

module.exports = ProfessorController
