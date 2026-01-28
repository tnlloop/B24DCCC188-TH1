// Import React và các hook cần dùng
import React, { useEffect, useState } from 'react';
// Import file style
import './index.less';

// Interface mô tả cấu trúc 1 công việc (Todo)
interface Todo {
  id: number;     // ID duy nhất của todo
  text: string;   // Nội dung công việc
}

// Component TodoList
const TodoList: React.FC = () => {
  // State lưu danh sách todo
  const [todos, setTodos] = useState<Todo[]>([]);
  // State lưu giá trị input
  const [input, setInput] = useState('');
  // State lưu id todo đang chỉnh sửa (null nếu không sửa)
  const [editingId, setEditingId] = useState<number | null>(null);

  // useEffect chạy 1 lần khi component mount
  // Dùng để load dữ liệu từ localStorage
  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  // useEffect chạy mỗi khi todos thay đổi
  // Lưu danh sách todo vào localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Hàm thêm mới hoặc cập nhật todo
  const handleAddOrEdit = () => {
    // Không cho thêm nếu input rỗng
    if (!input.trim()) return;

    // Trường hợp đang chỉnh sửa
    if (editingId !== null) {
      setTodos(
        todos.map(todo =>
          todo.id === editingId
            ? { ...todo, text: input } // cập nhật nội dung
            : todo
        )
      );
      setEditingId(null); // thoát chế độ sửa
    } else {
      // Trường hợp thêm mới
      setTodos([...todos, { id: Date.now(), text: input }]);
    }

    // Reset input sau khi thêm / sửa
    setInput('');
  };

  // Hàm xử lý khi bấm nút sửa
  const handleEdit = (todo: Todo) => {
    setInput(todo.text);     // đổ nội dung todo vào input
    setEditingId(todo.id);   // lưu id todo đang sửa
  };

  // Hàm xoá todo theo id
  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>Bài 2 - TodoList</h2>

      {/* Khu vực nhập công việc */}
      <div className="todo-input">
        <input
          placeholder="Nhập công việc..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={handleAddOrEdit}>
          {editingId ? 'Cập nhật' : 'Thêm'}
        </button>
      </div>

      {/* Danh sách công việc */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <div className="actions">
              <button onClick={() => handleEdit(todo)}>Sửa</button>
              <button
                className="delete"
                onClick={() => handleDelete(todo.id)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export component
export default TodoList;