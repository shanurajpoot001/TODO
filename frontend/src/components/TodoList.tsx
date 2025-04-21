'use client';

import React, { useState } from 'react';

interface Todo {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoListProps {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TodoList({ 
  todos, 
  onSelect, 
  currentPage, 
  totalPages, 
  onPageChange 
}: TodoListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <div
            key={todo._id}
            onClick={() => onSelect(todo)}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <h3 className="font-medium">{todo.title}</h3>
            <p className="text-sm text-gray-500 truncate">{todo.description}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(todo.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 