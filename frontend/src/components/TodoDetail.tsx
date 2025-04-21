'use client';

import React, { useState } from 'react';

interface Todo {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoDetailProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
}

export default function TodoDetail({ todo, onUpdate }: TodoDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleSave = () => {
    onUpdate(editedTodo);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={editedTodo.title}
              onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editedTodo.description}
              onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={4}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditedTodo(todo);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{todo.title}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Edit
            </button>
          </div>
          <p className="text-gray-600 mb-4">{todo.description}</p>
          <div className="text-sm text-gray-500">
            <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
            <p>Last updated: {new Date(todo.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
} 