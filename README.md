# api_gerencia_escolar_parcial
Api que possibilita o gerenciamento de alunos, professores e salas

Instruções para testar esta API localmente:
1. Faça um clone deste repositório em sua máquina (git clone https://github.com/JonathanEmanuel12/api_gerencia_escolar_parcial.git)
2. Acesse a pasta do projeto e modifique o nome do arquivo vazio.env para .env
3. Abra o arquivo .env em um editor e preencha os seguintes campos com seus dados locais:
 * DB_USER (usuario do banco de dados MySQL)
 * DB_PASSWORD (senha do banco de dados MySQL)
 * DB_DATABASE (crie um banco de dados MySQL e coloque aqui o seu nome)
4. Abra o terminal na pasta em que está o clone do repositório e rode o comando "npm install -g @adonisjs/cli"
5. Rode em seguida o comando "npm install" para instalar as dependências
6. E com o banco de dados já está criado (somente criado, sem tabelas), rode "adonis migration:run" para criar as tabelas
