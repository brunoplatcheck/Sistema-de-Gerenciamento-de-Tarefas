"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = exports.createTaskTable = void 0;
const pg_1 = require("pg");
const db_1 = __importDefault(require("./db"));
const createTaskTable = async () => {
    const client = await db_1.default.connect();
    try {
        await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Tabela de tarefas criada ou já existente.');
    }
    catch (err) {
        console.error('Erro ao criar a tabela de tarefas:', err);
    }
    finally {
        client.release();
    }
};
exports.createTaskTable = createTaskTable;
const createTask = async (task) => {
    const client = await db_1.default.connect();
    try {
        const res = await client.query('INSERT INTO tasks(title, description, completed) VALUES($1, $2, $3) RETURNING *', [task.title, task.description, task.completed]);
        return res.rows[0];
    }
    finally {
        client.release();
    }
};
exports.createTask = createTask;
const getTasks = async () => {
    const client = await db_1.default.connect();
    try {
        const res = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return res.rows;
    }
    finally {
        client.release();
    }
};
exports.getTasks = getTasks;
const getTaskById = async (id) => {
    const client = await db_1.default.connect();
    try {
        const res = await client.query('SELECT * FROM tasks WHERE id = $1', [id]);
        return res.rows[0];
    }
    finally {
        client.release();
    }
};
exports.getTaskById = getTaskById;
const updateTask = async (id, task) => {
    const client = await db_1.default.connect();
    try {
        const res = await client.query('UPDATE tasks SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *', [task.title, task.description, task.completed, id]);
        return res.rows[0];
    }
    finally {
        client.release();
    }
};
exports.updateTask = updateTask;
const deleteTask = async (id) => {
    const client = await db_1.default.connect();
    try {
        const res = await client.query('DELETE FROM tasks WHERE id = $1', [id]);
        return res.rowCount > 0;
    }
    finally {
        client.release();
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.model.js.map