'use client';

import React, { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';
import TodoDetail from '@/components/TodoDetail';

interface Todo {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTodos = async (page: number) => {
    try {
      const response = await fetch(`/api/todos?page=${page}&limit=10`);
      const data = await response.json();
      setTodos(data.todos);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos(currentPage);
  }, [currentPage]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleTodoUpdate = async (updatedTodo: Todo) => {
    try {
      const response = await fetch(`/api/todos/${updatedTodo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      
      if (response.ok) {
        setTodos(todos.map(todo => 
          todo._id === updatedTodo._id ? updatedTodo : todo
        ));
        setSelectedTodo(updatedTodo);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Todo App</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <TodoForm onTodoCreated={() => fetchTodos(currentPage)} />
            <TodoList 
              todos={todos} 
              onSelect={handleTodoSelect}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
          <div className="md:col-span-2">
            {selectedTodo ? (
              <TodoDetail 
                todo={selectedTodo} 
                onUpdate={handleTodoUpdate}
              />
            ) : (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-500">Select a todo to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 