import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Plus, Trash2, Edit2, Save, X, CheckCircle2, Circle } from 'lucide-react'
import './App.css'

const API_URL = 'http://localhost:3000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [csrfToken, setCsrfToken] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  // Buscar CSRF Token
  useEffect(() => {
    fetchCsrfToken();
    fetchTasks();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch(`${API_URL}/csrf-token`, {
        credentials: 'include'
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (error) {
      console.error('Erro ao buscar CSRF token:', error);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!newTask.title.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify(newTask)
      });
      
      if (response.ok) {
        setNewTask({ title: '', description: '', completed: false });
        fetchTasks();
        fetchCsrfToken(); // Renovar token após operação
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify(updatedTask)
      });
      
      if (response.ok) {
        setEditingTask(null);
        fetchTasks();
        fetchCsrfToken(); // Renovar token após operação
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'CSRF-Token': csrfToken
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        fetchTasks();
        fetchCsrfToken(); // Renovar token após operação
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const toggleTaskCompletion = async (task) => {
    await updateTask(task.id, { ...task, completed: !task.completed });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            Gerenciador de Tarefas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Organize suas tarefas de forma eficiente</p>
        </div>

        {/* Nova Tarefa */}
        <Card className="mb-8 shadow-lg border-indigo-200 dark:border-indigo-800 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nova Tarefa
            </CardTitle>
            <CardDescription>Adicione uma nova tarefa à sua lista</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Título da tarefa"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="border-indigo-200 focus:border-indigo-500"
              />
            </div>
            <div>
              <Textarea
                placeholder="Descrição (opcional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="border-indigo-200 focus:border-indigo-500 min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={createTask} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Tarefa
            </Button>
          </CardFooter>
        </Card>

        {/* Lista de Tarefas */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando tarefas...</p>
            </div>
          ) : tasks.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="py-12 text-center">
                <Circle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Nenhuma tarefa encontrada. Crie sua primeira tarefa!</p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task, index) => (
              <Card 
                key={task.id} 
                className={`shadow-lg transition-all duration-300 hover:shadow-xl border-l-4 ${
                  task.completed 
                    ? 'border-l-green-500 bg-green-50 dark:bg-green-950/20' 
                    : 'border-l-indigo-500'
                } animate-slide-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {editingTask?.id === task.id ? (
                  // Modo de Edição
                  <>
                    <CardHeader>
                      <Input
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        className="text-lg font-semibold"
                      />
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={editingTask.description || ''}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        className="min-h-[100px]"
                      />
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        onClick={() => updateTask(task.id, editingTask)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                      <Button 
                        onClick={() => setEditingTask(null)}
                        variant="outline"
                        className="flex-1"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    </CardFooter>
                  </>
                ) : (
                  // Modo de Visualização
                  <>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <button
                          onClick={() => toggleTaskCompletion(task)}
                          className="transition-transform hover:scale-110"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                        </button>
                        <span className={task.completed ? 'line-through text-gray-500' : ''}>
                          {task.title}
                        </span>
                      </CardTitle>
                      {task.description && (
                        <CardDescription className={task.completed ? 'line-through' : ''}>
                          {task.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardFooter className="flex gap-2">
                      <Button 
                        onClick={() => setEditingTask(task)}
                        variant="outline"
                        className="flex-1 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button 
                        onClick={() => deleteTask(task.id)}
                        variant="destructive"
                        className="flex-1 hover:bg-red-700 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
