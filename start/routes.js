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
    Route.get('/:matricula', 'AlunoController.buscarAluno')
    Route.post('/', 'AlunoController.cadastrarAluno')
    Route.put('/:matricula', 'AlunoController.editarAluno')
    Route.delete('/:matricula', 'AlunoController.deletarAluno')

}).prefix('api/aluno')

Route.group(() => {
    Route.get('/:matricula', 'ProfessorController.buscarProfessor')
    Route.post('/', 'ProfessorController.cadastrarProfessor')
    Route.put('/:matricula', 'ProfessorController.editarProfessor')
    Route.delete('/:matricula', 'ProfessorController.deletarProfessor')
}).prefix('api/professor')