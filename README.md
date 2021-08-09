# To-do List em NestJS com PostgreSql

**Desafio**

Desenvolver um sistema de To-do List com banco relacional, onde o usuário tenha as seguintes característica:

- Não precisa ter cadastro no sistema
- Tem acesso a lista de tarefas pendentes
- Tem acesso a lista de tarefas já concluídas.
- Pode incluir uma nova tarefa informando os dados:
  - Nome do responsável
  - Email do responsável (deve ser validado conforme descrito abaixo)
  - Descrição da tarefa
- Pode alterar as tarefas de “pendente” para “concluída”.
- Pode alterar as tarefa de “concluída” para “pendente”, este procedimento só pode ser realizado duas vezes por tarefa, e precisa informar a senha do supervisor (a senha é fixa e está na variável de ambiente SUPERVISOR_PASSWORD).
- Pode incluir 3 tarefas randômicas através da opção “**Estou sem tarefas**”

**Validação do email**

Deverá ser utilizada a API do MailboxLayer (https://mailboxlayer.com/documentation - API KEY será definida na variável de ambiente MAILBOXLAYER_KEY). Será considerado um e-mail correto aquele que tem formato válido e que tenha os registros MX de acordo também. Se o e-mail for inválido deverá sugerir ao usuário o endereço indicado pela API (atributo did_you_mean).

**Opção "Estou sem tarefas"**

Incluir 3 tarefas automaticamente ao usuário de nome “Eu”, email “[eu@me.com](mailto:eu@me.com)”. As descrição das tarefas devem conter fatos randômicos sobre Cachorros, consultados na API (https://alexwohlbruck.github.io/cat-facts/).

## Instalação

Você precisa instalar o [NestJs](https://docs.nestjs.com/) para executar o projeto:

```bash
$   npm i -g @nestjs/cli
```

Após isso instale as dependências do projeto:

```bash
$ npm install
```

Antes de executar o projeto, precisamos definir as variáveis de ambiente, conforme exemplo no arquivo **.env.example** presenta na raiz do projeto.

Existem muitas maneira de definir as variáveis de ambiente, a mais simples é criarmos um arquivo chamado **.env** na raiz do projeto, semelhante ao arquivo **.env.example**.

## Banco de Dados (executando migrations)

Para realização do desafio, utilizei uma instancia de banco de dados gratuito do site https://www.elephantsql.com/, incluindo as informações de acesso da base no arquivo **.env**.

Após a criação do banco de dados, e definição das variáveis de ambiente, precisamos executar as migrations do projeto, criando assim a estrutura do banco de dados:

```bash
$ npm run migrate
```

## Executando o projeto

Você pode inicializar o projeto através dos seguintes comandos:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Mas lembre, os comandos acima executam todo o pacato NestJs, o que pode exigir mais de 2GB de memória RAM.
Para executar o projeto de uma forma mais eficiente, primeiro vamos gerar um build do mesmo, através do comando:

```bash
$ npm run build
```

Em seguida vamos executar o código gerado na pasta **dist**, através do comando:

```bash
$ npm run start:prod
```

## Swagger (documentação dos endpoints)

Este micro serviço foi implementado utilizando a estratégia de auto-documentação do próprio código. Para acessar a documentação precisamos executar o projeto e em seguida acessar a url http://localhost:3000/swagger/.

## Frontend em React Native com Expo e geração de PWA

Acesse o projeto [**To-Do List Frontend**](https://github.com/allistertr/to-do-list-challenge-frontend).
