'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const User = use('App/Models/User');

Route.get('api/aluno/:matricula', async ({ params }) => {
    const user = await User.find(params.matricula)
    try {
        if(user.isProfessor == true) {
            new Error("Acesso negado")
        }
        return user
    }
    catch(error) {
        if(error instanceof TypeError) { return {mensagem: "Nenhum aluno encontrado"} }
        return {mensagem: error.message}
    }
     
})

Route.post('api/aluno/', async ({ request }) => {
    const { username, email, password, data_nascimento } = request.post()
    const user = new User()

    user.username = username
    user.email = email
    user.password = password
    user.data_nascimento = data_nascimento
    user.isProfessor = false

    return await user.save()
})

Route.put('api/aluno/:matricula', async ({ request, params }) => {
    const { username, email, password, data_nascimento } = request.post()
    const user = await User.find(params.matricula)

    if(username) { user.username = username }
    if(email) { user.email = email }
    if(password) { user.password = password }
    if(data_nascimento) { user.data_nascimento = data_nascimento }

    return await user.save()
})

Route.delete('api/aluno/:matricula', async ({ params }) => {
    const user = await User.find(params.matricula)
    
    return await user.delete()
})
