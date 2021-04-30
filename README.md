# back-end
back-end da aplicação da bye-five com o gerenciador de pacotes yarn

após o yarn install para instalar as dependecias do projeto 
Para rodar a aplicação o script ultilizado é o yarn start ele se iniciará na porta 4000 ou 4004
a conexão com o banco de dados já está ligado ao clustes do atlas no mongoDB

http://localhost:4000/user/register : rota de cadastrar que pede no body em json um objeto com os seguintes dados

{  
    "name": "",
    "email": "",
    "password": "" 
}
pelo postman ele retorna uma messangem de sucesso se a aplicação for bem sucedida com o token e se tiver erro uma mensagem contendo o erro

http://localhost:4000/user/login : rota para logar no banco de dados pelo postman ele pede no body em json um objeto com os seguintes dados 

{  
    "email": "wendel23@gmail.com",
    "password": "123456" 
}

