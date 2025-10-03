
# Sistema de Gerenciamento de Tarefas

Este projeto é um sistema completo de gerenciamento de tarefas, desenvolvido como uma solução para o desafio prático da Stoix. O sistema inclui um backend robusto com APIs RESTful e um frontend moderno e interativo.

## Tecnologias Utilizadas

- **Backend**: TypeScript, Node.js, Express, PostgreSQL, CSRF Token
- **Frontend**: React, TypeScript, HTML, CSS, shadcn/ui, Tailwind CSS

## Estrutura do Projeto

O projeto está organizado em duas pastas principais:

- `backend`: Contém o código-fonte do servidor, APIs e lógica de negócios.
- `frontend`: Contém o código-fonte da aplicação cliente, interface do usuário e componentes.

## Configuração e Execução do Projeto Completo

Siga os passos abaixo para configurar e executar o sistema de gerenciamento de tarefas:

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou pnpm
- Docker (para rodar o PostgreSQL)

### 1. Configuração do Backend

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

### 2. Configuração do Frontend

1.  **Navegue até o diretório do frontend:**

    ```bash
    cd task-manager-project/frontend/task-manager-frontend
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    # ou npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    pnpm run dev
    # ou npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173`.

## Tutorial de Teste

Para um tutorial detalhado sobre como testar a aplicação, consulte o arquivo `TEST_TUTORIAL.md`.

