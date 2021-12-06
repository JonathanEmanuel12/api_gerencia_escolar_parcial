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


Route.group(() => {
    Route.post('/login', 'UserController.autenticarUsuario')
    Route.get('/:matricula', 'UserController.buscarUsuario').middleware(['auth'])
    Route.post('/', 'UserController.cadastrarUsuario')
    Route.put('/:matricula', 'UserController.editarUsuario').middleware(['auth'])
    Route.delete('/:matricula', 'UserController.deletarUsuario').middleware(['auth'])
    Route.get('/:matricula_aluno/:numero_sala', 'UserController.buscarSalas').middleware(['auth'])

}).prefix('api/user')

Route.group(() => {
    Route.get('/:numero_sala', 'RoomController.buscarSala').middleware(['auth'])
    Route.post('/', 'RoomController.cadastrarSala').middleware(['auth'])
    Route.put('/:numero_sala', 'RoomController.editarSala').middleware(['auth'])
    Route.delete('/:numero_sala', 'RoomController.deletarSala').middleware(['auth'])
    
}).prefix('api/room')

Route.group(() => {
    Route.post('/', 'UserController.alocarAluno').middleware(['auth'])
    Route.delete('/:matricula_aluno/:numero_sala', 'UserController.desalocarAluno').middleware(['auth'])
}).prefix('api/locacao')

// Route.group(() => {
//     Route.post('/login', 'UserController.autenticarProfessor')
//     Route.get('/:matricula', 'UserController.buscarProfessor').middleware(['auth'])
//     Route.post('/', 'UserController.cadastrarProfessor').middleware(['auth'])
//     Route.put('/:matricula', 'UserController.editarProfessor').middleware(['auth'])
//     Route.delete('/:matricula', 'UserController.deletarProfessor').middleware(['auth'])
    
// }).prefix('api/professor')