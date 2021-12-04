# api_gerencia_escolar_parcial
Api que possibilita o gerenciamento de alunos, professores e salas


## Rotas

### Aluno
* Get api/aluno/:matricula - consultar dados de cadastro do aluno
* Post api/aluno/ - salvar dados de novo aluno
* Put api/aluno/:matricula - alterar dados de aluno
* Delete api/aluno/:matricula - deletar dados de aluno
* Get api/aluno/:matricula/salas - consultar salas em que o aluno está

### Professor
* Get api/professor/:matricula - consultar dados de cadastro do professor
* Post api/professor/ - salvar dados de novo professor
* Put api/professor/:matricula - alterar dados de professor
* Delete api/professor/:matricula - deletar dados de professor
* Get api/professor/:matricula/sala/:numero_sala - consultar dados de uma sala
* Post api/professor/:matricula/sala - salvar dados de uma sala
* Put api/professor/:matricula/sala/:numero_sala
* Delete api/professor/:matricula/sala/:numero_sala
