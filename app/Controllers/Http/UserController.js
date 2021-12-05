'use strict'

class UserController {
    User = use('App/Models/User')

    async buscarUsuario (matricula, isProfessor) {
        const user = await this.User.find(matricula)
        try {
            if(user.isProfessor != isProfessor) {
                throw new Error("Acesso negado")
            }
            return user
        }
        catch(error) {
            if(error instanceof TypeError) { return {mensagem: "Nenhum aluno encontrado"} }
            return {mensagem: error.message}
        }
         
    }

    async cadastrarUsuario (body, isProfessor) {
        const { username, email, password, data_nascimento } = body
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

    async editarUsuario (body, matricula) {
        const { username, email, password, data_nascimento } = body
        const user = await this.User.find(matricula)
    
        if(username) { user.username = username }
        if(email) { user.email = email }
        if(password) { user.password = password }
        if(data_nascimento) { user.data_nascimento = data_nascimento }
    
        return await user.save()
    }

    async deletarUsuario (matricula) {
        const user = await this.User.find(matricula)
        
        return await user.delete()
    }
}

module.exports = UserController
