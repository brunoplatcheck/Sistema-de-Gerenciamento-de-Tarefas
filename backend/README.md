
# Backend do Sistema de Gerenciamento de Tarefas

Este diretório contém o backend da aplicação de gerenciamento de tarefas, desenvolvido com TypeScript, Node.js e Express.

## Funcionalidades

- **CRUD de Tarefas**: Criar, Ler, Atualizar e Excluir tarefas.
- **API RESTful**: Endpoints bem definidos para interação com o frontend.
- **Autenticação CSRF Token**: Proteção contra ataques de falsificação de solicitação entre sites.
- **Banco de Dados PostgreSQL**: Armazenamento persistente das tarefas.

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [pg](https://node-postgres.com/) (driver PostgreSQL para Node.js)
- [dotenv](https://www.npmjs.com/package/dotenv) (para variáveis de ambiente)
- [cors](https://www.npmjs.com/package/cors) (para Cross-Origin Resource Sharing)
- [csurf](https://www.npmjs.com/package/csurf) (para proteção CSRF)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) (para parsing de cookies)

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou pnpm
- Docker (para rodar o PostgreSQL)

### Passos para Configuração

1.  **Navegue até o diretório do backend:**

    ```bash
    cd task-manager-project/backend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou pnpm install
    ```

3.  **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do diretório `backend` com o seguinte conteúdo:

    ```
    DB_USER=admin
    DB_HOST=localhost
    DB_DATABASE=taskdb
    DB_PASSWORD=secret
    DB_PORT=5432
    PORT=3000
    ```

4.  **Inicie o banco de dados PostgreSQL com Docker:**

    Certifique-se de que o Docker esteja em execução. Em seguida, execute o comando:

    ```bash
    sudo docker run --name task-manager-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=taskdb -p 5432:5432 -d postgres
    ```

    Se o container já existir e estiver parado, você pode iniciá-lo com:

    ```bash
    sudo docker start task-manager-postgres
    ```

5.  **Compile o código TypeScript:**

    ```bash
    npx tsc
    ```

6.  **Inicie o servidor backend:**

    ```bash
    node dist/app.js
    ```

    O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

- `GET /`: Retorna uma mensagem de boas-vindas.
- `GET /csrf-token`: Retorna um CSRF token para uso em requisições POST, PUT e DELETE.
- `POST /tasks`: Cria uma nova tarefa. Requer CSRF token no cabeçalho `CSRF-Token`.
- `GET /tasks`: Lista todas as tarefas.
- `GET /tasks/:id`: Retorna uma tarefa específica pelo ID.
- `PUT /tasks/:id`: Atualiza uma tarefa existente. Requer CSRF token no cabeçalho `CSRF-Token`.
- `DELETE /tasks/:id`: Exclui uma tarefa. Requer CSRF token no cabeçalho `CSRF-Token`.

