'use strict'

class RoomController {

    Room = use('App/Models/Room')

    async buscarSala ({ params, auth }) {
        const room = await this.Room
        .query()
        .where('numero_sala', '=', params.numero_sala)
        .fetch()
        try {
            this.verificarUsuario(auth.user)
            return room
        }
        catch(error) {
            if(error instanceof TypeError) { return {mensagem: "Nenhuma sala encontrada"} }
            return {mensagem: error.message}
        }
         
    }

    async cadastrarSala ({ request, auth}) {
        const { numero_sala, capacidade_alunos, disponibilidade } = request.post()
        const room = new this.Room()

        this.verificarUsuario(auth.user)
    
        room.numero_sala = numero_sala
        room.capacidade_alunos = capacidade_alunos
        room.professor_id = auth.user.id
        room.disponibilidade = disponibilidade;
    
        try{
            return await room.save()
        }
        catch(error) {
            return { mensagem: "Verifique se os parametros enviados correspondem a documentação, se o erro persistir tente mais tarde" }
        }
        
    }

    async editarSala ({ params, request, auth }) {
        const { capacidade_alunos, disponibilidade } = request.post()
        const room = await this.Room.findBy('numero_sala', params.numero_sala)

        console.log(room.capacidade_alunos)

        this.verificarUsuario(auth.user)

        if(capacidade_alunos) { room.capacidade_alunos = capacidade_alunos }
        if(disponibilidade) { room.disponibilidade = disponibilidade }

        return await room.save()
    }

    async deletarSala ({ params, auth }) {
        const room = await this.Room.findBy('numero_sala', params.numero_sala)
        
        this.verificarUsuario(auth.user)

        return await room.delete()
    }

    verificarUsuario(usuarioAutenticado) {
        if(usuarioAutenticado.isProfessor == false) {
            throw new Error("Acesso negado")
        }
    }
}

module.exports = RoomController
