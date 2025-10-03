
# Frontend do Sistema de Gerenciamento de Tarefas

Este diretório contém o frontend da aplicação de gerenciamento de tarefas, desenvolvido com React, TypeScript, HTML e CSS.

## Funcionalidades

- **Interface Amigável**: Permite criar, visualizar, editar e excluir tarefas.
- **Consumo de APIs**: Interage com o backend para realizar operações CRUD.
- **Design Responsivo**: Adapta-se a diferentes tamanhos de tela.

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (bundler)
- [Tailwind CSS](https://tailwindcss.com/) (framework CSS)
- [shadcn/ui](https://ui.shadcn.com/) (componentes UI)
- [Lucide React](https://lucide.dev/icons/) (ícones)

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou pnpm
- O backend deve estar em execução em `http://localhost:3000`.

### Passos para Configuração

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

## Interação com o Backend

O frontend se comunica com o backend através de requisições HTTP para os seguintes endpoints:

- `GET /csrf-token`: Para obter o token CSRF.
- `POST /tasks`: Para criar uma nova tarefa.
- `GET /tasks`: Para listar todas as tarefas.
- `PUT /tasks/:id`: Para atualizar uma tarefa.
- `DELETE /tasks/:id`: Para excluir uma tarefa.

As requisições que modificam dados (POST, PUT, DELETE) incluem o `CSRF-Token` no cabeçalho para proteção contra ataques CSRF.

