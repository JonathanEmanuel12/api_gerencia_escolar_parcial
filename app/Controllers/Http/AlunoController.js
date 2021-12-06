'use strict'

class AlunoController {

    UserController = use('App/Controllers/Http/UserController')
    userController = new this.UserController()


    async autenticarAluno ({ request, auth }) {
        return await this.userController.autenticarUsuario(request.post(), auth)
    }

    async buscarAluno ({ params, auth }) {
        const isProfessor = false
        return await this.userController.buscarUsuario(params.matricula, isProfessor, auth.user)
    }

    async cadastrarAluno ({ request }) {
        const body = request.post()
        const isProfessor = false
        this.userController.cadastrarUsuario(body, isProfessor)
    }

    async editarAluno ({ request, params, auth}) {
        const body = request.post()
        this.userController.editarUsuario(body, params.matricula, auth.user)
    }

    async deletarAluno ({ params }) {
        this.userController.deletarUsuario(params.matricula, auth.user)
    }
}

module.exports = AlunoController
