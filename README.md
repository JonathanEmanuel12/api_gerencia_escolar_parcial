# api_gerencia_escolar_parcial
Api que possibilita o gerenciamento de alunos, professores e salas

### Instruções para testar esta API localmente:

1. Faça um clone deste repositório em sua máquina (git clone https://github.com/JonathanEmanuel12/api_gerencia_escolar_parcial.git)
2. Acesse a pasta do projeto e modifique o nome do arquivo vazio.env para .env
3. Abra o arquivo .env em um editor e preencha os seguintes campos com seus dados locais:
 * DB_USER (usuario do banco de dados MySQL)
 * DB_PASSWORD (senha do banco de dados MySQL)
 * DB_DATABASE (crie um banco de dados MySQL e coloque aqui o seu nome)
4. Abra o terminal na pasta em que está o clone do repositório e rode o comando "npm install -g @adonisjs/cli"
5. Rode em seguida o comando "npm install" para instalar as dependências
6. E com o banco de dados já está criado (somente criado, sem tabelas), rode "adonis migration:run" para criar as tabelas
7. Para iniciar a api rode "adonis serve --dev". A api já está funcionando
8. Para testar a api abra o Insomnia e importe o arquivo "Insomnia_rotas_api_desafio" que está na pasta do projeto
9. O nome do projeto no Insomnia é clicksoft_api_desafio e possui 13 rotas. Comece pela rota salvarUsuario

*OBS: O formato da data deve ser MM/DD/AAAA*

10. Após criar alguns usuários para teste, o passo seguinte é se autenticar. Na rota autenticarUsuario passe o email e a senha de algum usuário (professor ou aluno) para receber um token JWT que deverá ser usado para acessar as demais rotas.

*OBS: Se o usuário for um aluno ele terá acesso as seguintes rotas com seu token JWT: deletarUsuario, buscarUsuario, editarUsuario, buscarAlunoSalas.
Se for professor poderá acessar todas as rotas com exceção da buscarAlunoSalas.*

11. Para acessar as outras rotas deve-se copiar o token JWT recebido e colar no campo "token" da aba "Bearer" da rota desejada

### Rotas 

**api/user**

* salvarUsuario - Post / = cadastrar novo usuário
* autenticarUsuario - Post /login = autenticar usuário e receber token JWT
* buscarUsuario - Get /:matricula = buscar usuário pela matrícula
* editarUsuario - Put /:matricula = editar uma ou mais informações do usuário
* deletarUsuario - Delete /:matricula = deletar usuário
* buscarAlunoSalas - Get /:matricula_aluno/salas = buscar salas (nome do professor e número da sala) em que o aluno está alocado

**api/room**

* salvarSala - Post / = cadastrar nova sala
* consultarSala - Get /:numero_sala = buscar sala pelo número da sala
* editarSala - Put /:numero_sala = editar uma ou mais informações da sala
* deletarSala - Delete /:numero_sala = deletar sala
* buscarSalaAlunos - Get /:numero_sala/alunos = busca todos os alunos alocados em determinada sala

**api/locacao**

* alocarAluno - Post / = alocar (adicionar) aluno numa sala
* desalocarAluno - Delete = desalocar (retirar) aluno de uma sala

*OBS: Os formatos dos dados armazenados podem ser vistos na pasta database/migrations e a forma de enviar os dados para a API é demonstrada pelo arquivo a ser importado pelo Insomnia*
