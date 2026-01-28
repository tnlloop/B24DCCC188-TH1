import React from 'react';
import { Todo } from './TodoList';

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete }) => {
  return (
    <li className="todo-item">
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </li>
  );
};

export default TodoItem;