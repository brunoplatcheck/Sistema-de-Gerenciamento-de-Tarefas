"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const csurf_1 = __importDefault(require("csurf"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const task_model_1 = require("./task.model");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.use((0, cookie_parser_1.default)());
// Middleware CSRF
const csrfProtection = (0, csurf_1.default)({ cookie: true });
// Inicializa a tabela de tarefas
(0, task_model_1.createTaskTable)();
// Rota de teste
app.get('/', (req, res) => {
    res.send('Backend do Gerenciador de Tarefas está funcionando!');
});
// Rota para obter o CSRF token
app.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
// Rotas CRUD para tarefas
app.post('/tasks', csrfProtection, async (req, res) => {
    try {
        const newTask = await (0, task_model_1.createTask)(req.body);
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
});
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await (0, task_model_1.getTasks)();
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar tarefas' });
    }
});
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await (0, task_model_1.getTaskById)(parseInt(req.params.id));
        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar tarefa' });
    }
});
app.put('/tasks/:id', csrfProtection, async (req, res) => {
    try {
        const updatedTask = await (0, task_model_1.updateTask)(parseInt(req.params.id), req.body);
        if (updatedTask) {
            res.status(200).json(updatedTask);
        }
        else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar tarefa' });
    }
});
app.delete('/tasks/:id', csrfProtection, async (req, res) => {
    try {
        const deleted = await (0, task_model_1.deleteTask)(parseInt(req.params.id));
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir tarefa' });
    }
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
//# sourceMappingURL=app.js.map