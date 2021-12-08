'use strict'

class UserController {
    User = use('App/Models/User')

    async autenticarUsuario ({ request, auth }) {
        const { email, password} = request.post()
        return await auth.attempt(email, password)
    }

    async buscarUsuario ({ params, auth }) {
        const user = await this.User.findBy('matricula', params.matricula)
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
        const { nome, matricula, email, password, data_nascimento, isProfessor } = request.post()
        const user = new this.User()

        user.nome = nome
        user.matricula = matricula
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
        const { nome, matricula, email, password, data_nascimento } = request.post()

        try {
            const user = await this.User.findBy('matricula', params.matricula)

            this.verificarAutorizacao(user, auth.user)
    
            if(nome) { user.nome = nome }
            if(matricula) { user.matricula = matricula }
            if(email) { user.email = email }
            if(password) { user.password = password }
            if(data_nascimento) { user.data_nascimento = data_nascimento }
        
            return await user.save()
        }
        catch(error) {
            return { mensagem: error.message }
        }
       
    }

    async deletarUsuario ({ params, auth }) {

        try {
            const user = await this.User.findBy('matricula',params.matricula)
            
            this.verificarAutorizacao(user, auth.user)

            return await user.delete()
        }
        catch(error) {
            return { mensagem: error.message }
        }
    }

    async buscarSalas ({ params, auth }) {
        try{
            const user = await this.User.findBy('matricula', params.matricula_aluno)
            this.verificarAutorizacao(user, auth.user)
            this.isProfessor(user)

            const salasBanco = await user.rooms().fetch()
            const salasArray = this.converterParaObjetoSimples(salasBanco)

            let resposta = {
                nomeAluno: user.nome,
                arrayProfessorSala: []
            }
            for (let index = 0; index < salasArray.length; index++)
            {

                const professor = await this.User.find(salasArray[index].professor_id)
                let professorSala = {
                    nomeProfessor: professor.nome,
                    numero_sala: salasArray[index].numero_sala
                }

                resposta.arrayProfessorSala.push(professorSala)
            }
            return resposta
        }
        catch(error) {
            return { mensagem: error.message }
        }
        
    }

    async buscarAlunosPorSala({ params, auth }) {
        const Room = use('App/Models/Room')
        
        try {
            const room = await Room.findBy('numero_sala', params.numero_sala)

            this.verificarProfessorSala(room, auth.user)

            const Database = use('Database')
            const salas = await Database
            .table('room_user')
            .where("room_id", room.id)

            let listaAlunos = []
            const arraySalaAlunos = this.converterParaObjetoSimples(salas)

            for (let index = 0; index < arraySalaAlunos.length; index++) {
                const aluno = await this.User.find(arraySalaAlunos[index].user_id)
                listaAlunos.push(aluno)
            }

            return listaAlunos
        }
        catch(error) {
            return { mensagem: error.message }
        }
        
    }

    async alocarAluno ({ request, auth }) {
        const { matricula_aluno, numero_sala } = request.post()
        const Room = use('App/Models/Room')

        try{
            const room = await Room.findBy('numero_sala', numero_sala)

            this.verificarDisponibilidadeSala(room)
            await this.verificarCapacidadeSala(room)
            this.verificarProfessorSala(room, auth.user)

            const user = await this.User.findBy('matricula', matricula_aluno)

            this.isProfessor(user)
            
            return user.rooms().attach([room.id])
        }
        catch(error) {
            return { mensagem: error.message }
        }
        
    }

    async desalocarAluno ({ params, auth }) {
        const { matricula_aluno, numero_sala } = params
        
        try {
            const user = await this.User.findBy('matricula', matricula_aluno)
            const Room = use('App/Models/Room') 
            const room = await Room.findBy('numero_sala', numero_sala)

            this.verificarProfessorSala(room, auth.user)

            return user.rooms().detach([room.id])
        }
        catch(error) {
            return { mensagem: error.message }
        }
        
    }


    verificarAutorizacao(user, usuarioAutenticado) {
        if(user.id != usuarioAutenticado.id) {
            throw new Error("Acesso negado")
        }
    }

    verificarProfessorSala(room, professor) {
        if(room.professor_id != professor.id) {
            throw new Error("Acesso negado")
        }
    }

    verificarDisponibilidadeSala(room) {
        if(room.disponibilidade == false) {
            throw new Error("Esta sala não está aberta para alunos")
        }
    }

    isProfessor(user) {
        if(user.isProfessor == true) {
            throw new Error("Matrícula de professor em operação que requere matrícula de aluno")
        }
    }

    async verificarCapacidadeSala(room) {
        const Database = use('Database')
        
        const countArray = await Database
        .table('room_user')
        .where('room_id', room.id)
        .count()

        const countAlunos = countArray[0]['count(*)']
        
        if(room.capacidade_alunos <= countAlunos) {
            throw new Error("Esta sala esta cheia")
        }
    }

    converterParaObjetoSimples(objeto) {
        const conversor = JSON.stringify(objeto)
        return JSON.parse(conversor)
    }
}

module.exports = UserController
