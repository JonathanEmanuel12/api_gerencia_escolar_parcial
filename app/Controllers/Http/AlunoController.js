'use strict'

class AlunoController {

    UserController = use('App/Controllers/Http/UserController')
    userController = new this.UserController()

    async buscarAluno ({ params }) {
        const isProfessor = false
        return await this.userController.buscarUsuario(params.matricula, isProfessor)
    }

    async cadastrarAluno ({ request }) {
        const body = request.post()
        const isProfessor = false
        this.userController.cadastrarUsuario(body, isProfessor)
    }

    async editarAluno ({ request, params }) {
        const body = request.post()
        this.userController.editarUsuario(body, params.matricula)
    }

    async deletarAluno ({ params }) {
        this.userController.deletarUsuario(params.matricula)
    }
}

module.exports = AlunoController
