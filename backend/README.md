# Backend construido em NodeJs

Basicamente nessa aplicação, temos um servidor que vai possibilitar que os dados sejam consumidos por aplicações
de Frontend fornecendo informações que estão armazenadas no BD e onde faremos os tratamentos necessários
para entregar os dados na View que o usuário terá accesso.

**Resumindo**: A API irá controlar o acesso ao Banco de Dados, com todas as regras de negócio definida para a aplicação funcionar de acordo com o esperado.

 Temos que destacar algumas bibliotecas e ferramentas que foram usadas junto com o NodeJs, que são:
 - *Express* : com ele foi criado as rotas da API REST, definindo as entradas de cada rota, para o usuário poder acessar. 

 - *Mongoose* : usado para facilitar a manipulação do banco de dados, que nesse caso é o *MongoDB*.
 
 - *MongoBD Atlas* : onde os dados estarão aramazados, a aplicação podera acessar esses dados sem problemas, pois tá na nuvem, é só ter as credenciais de acesso e tudo certo, vai tá ali disponível para ser consumida.
 
 - *Multer* : essa biblioteca será usada aqui para manipular os arquivos de imagens que serão usados nas aplicações
 
 - *Nodemon* : permite que o servidor se atualize enquanto estamos editando e salvando o código, para que possamos fazer as modificações ser ter que ficar reiniciando os servidor a todo momento. ( Uma verdadeira mão na roda ) 

 Para rodar só rodar:

    `yarn dev` ou `npm dev` 
 