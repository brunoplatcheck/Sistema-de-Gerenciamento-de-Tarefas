
import { PoolClient } from 'pg';
import pool from './db';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export const createTaskTable = async () => {
  const client = await pool.connect();
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
  } catch (err) {
    console.error('Erro ao criar a tabela de tarefas:', err);
  } finally {
    client.release();
  }
};

export const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'INSERT INTO tasks(title, description, completed) VALUES($1, $2, $3) RETURNING *',
      [task.title, task.description, task.completed]
    );
    return res.rows[0];
  } finally {
    client.release();
  }
};

export const getTasks = async (): Promise<Task[]> => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return res.rows;
  } finally {
    client.release();
  }
};

export const getTaskById = async (id: number): Promise<Task | undefined> => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return res.rows[0];
  } finally {
    client.release();
  }
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task | undefined> => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'UPDATE tasks SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [task.title, task.description, task.completed, id]
    );
    return res.rows[0];
  } finally {
    client.release();
  }
};

export const deleteTask = async (id: number): Promise<boolean> => {
  const client = await pool.connect();
  try {
    const res = await client.query('DELETE FROM tasks WHERE id = $1', [id]);
    return res.rowCount > 0;
  } finally {
    client.release();
  }
};

