import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialTodos } from "./data/todos";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";

function App() {
  const [todos, setTodos] = useState(initialTodos);

  // Tambah tugas baru
  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  // Update tugas berdasarkan ID
  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  // Hapus tugas berdasarkan ID
  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              todos={todos}
              onAddTodo={handleAddTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={<TodoDetail todos={todos} onUpdateTodo={handleUpdateTodo} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;