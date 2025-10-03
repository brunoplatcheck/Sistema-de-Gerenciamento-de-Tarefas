
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import { createTaskTable, createTask, getTasks, getTaskById, updateTask, deleteTask } from './task.model';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

// Middleware CSRF
const csrfProtection = csurf({ cookie: true });

// Inicializa a tabela de tarefas
createTaskTable();

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
    const newTask = await createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar tarefas' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await getTaskById(parseInt(req.params.id));
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar tarefa' });
  }
});

app.put('/tasks/:id', csrfProtection, async (req, res) => {
  try {
    const updatedTask = await updateTask(parseInt(req.params.id), req.body);
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
});

app.delete('/tasks/:id', csrfProtection, async (req, res) => {
  try {
    const deleted = await deleteTask(parseInt(req.params.id));
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir tarefa' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

