import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import './todoList.less';

export interface Todo {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  // Load từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
      },
    ]);
    setInput('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>Bài 2: Todo List</h2>

      <div className="todo-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập công việc"
        />
        <button onClick={handleAdd}>Thêm</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;