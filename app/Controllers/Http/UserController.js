'use strict'

class UserController {
    User = use('App/Models/User')

    async autenticarUsuario ({ request, auth }) {
        const { email, password} = request.post()
        return await auth.attempt(email, password)
    }

    async buscarUsuario ({ params, auth }) {
        const user = await this.User.find(params.matricula)
        try {
            this.verificarAutorizacao(user, auth.user)
            return user
        }
        catch(error) {
            if(error instanceof TypeError) { return {mensagem: "Nenhum aluno encontrado"} }
            return {mensagem: error.message}
        }
         
    }

    async cadastrarUsuario ({ request }) {
        const { username, email, password, data_nascimento, isProfessor } = request.post()
        const user = new this.User()

        user.username = username
        user.email = email
        user.password = password
        user.data_nascimento = data_nascimento
        user.isProfessor = isProfessor
    
        try{
            return await user.save()
        }
        catch(error) {
            return { mensagem: "Verifique se os parametros enviados correspondem a documentação, se o erro persistir tente mais tarde" }
        }
        
    }

    async editarUsuario ({ params, request, auth }) {
        const { username, email, password, data_nascimento } = request.post()
        const user = await this.User.find(params.matricula)

        this.verificarAutorizacao(user, auth.user)

        if(username) { user.username = username }
        if(email) { user.email = email }
        if(password) { user.password = password }
        if(data_nascimento) { user.data_nascimento = data_nascimento }
    
        return await user.save()
    }

    async deletarUsuario ({ params, auth }) {
        const user = await this.User.find(params.matricula)
        
        this.verificarAutorizacao(user, auth.user)

        return await user.delete()
    }

    async buscarSalas ({ params, auth }) {
        const user = await this.User.find(params.matricula)

        this.verificarAutorizacao(user, auth.user)

        return await user.rooms().fetch()
    }

    async alocarAluno ({ request, auth }) {
        const { matricula_aluno, numero_sala } = request.post()
        const Room = use('App/Models/Room')
        const room = Room.findBy('numero_sala', numero_sala)

        this.verificarProfessorSala(room, auth.user)

        const user = this.User.find(matricula_aluno)
        user.rooms().attach([room.id])
    }

    async desalocarAluno ({ params, auth }) {
        const { matricula_aluno, numero_sala } = params
        const user = this.User.find(matricula_aluno)
        const Room = use('App/Models/Room') 
        const room = Room.findBy('numero_sala', numero_sala)

        this.verificarProfessorSala(room, auth.user)

        user.rooms().detach([room.id])
    }

    verificarAutorizacao(user, usuarioAutenticado) {
        if(user.id != usuarioAutenticado.id) {
            throw new Error("Acesso negado")
        }
    }

    verificarProfessorSala(room, professor) {
        if(room.professor_id == professor.id) {
            throw new Error("Acesso negado")
        }
    }
}

module.exports = UserController
