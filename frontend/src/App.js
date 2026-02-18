import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = filter !== null 
        ? `http://localhost:8080/api/todos?completed=${filter}`
        : 'http://localhost:8080/api/todos';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.title || 'Failed to add todo');
      }
      await fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      setError(error.message || 'Failed to add todo. Please try again.');
    }
  };

  const updateTodo = async (id, todo) => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.title || 'Failed to update todo');
      }
      await fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
      setError(error.message || 'Failed to update todo. Please try again.');
    }
  };

  const deleteTodo = async (id) => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      await fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const toggleComplete = async (todo) => {
    await updateTodo(todo.id, { ...todo, completed: !todo.completed });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo Application</h1>
        {error && (
          <div className="error-message" onClick={() => setError(null)}>
            {error}
            <span className="error-close">×</span>
          </div>
        )}
        <TodoForm onAdd={addTodo} />
        <div className="filter-buttons">
          <button 
            className={filter === null ? 'active' : ''} 
            onClick={() => setFilter(null)}
            disabled={loading}
          >
            All
          </button>
          <button 
            className={filter === false ? 'active' : ''} 
            onClick={() => setFilter(false)}
            disabled={loading}
          >
            Active
          </button>
          <button 
            className={filter === true ? 'active' : ''} 
            onClick={() => setFilter(true)}
            disabled={loading}
          >
            Completed
          </button>
        </div>
        {loading ? (
          <div className="loading-message">Loading todos...</div>
        ) : (
          <TodoList 
            todos={todos} 
            onToggle={toggleComplete}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;

