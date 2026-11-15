import { useState } from "react";
import { useNavigate } from "react-router-dom";
import titleIcon from "../assets/icon1.png"; 
import cornerIcon from "../assets/icon2.png";

export default function Home({ todos, onAddTodo, onDeleteTodo }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk form Tambah Todo
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "to-do",
    priority: "low",
    deadline: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert("Judul tugas wajib diisi!");

    onAddTodo({
      ...formData,
      id: Date.now()
    });

    // Reset form dan tutup modal
    setFormData({
      title: "",
      description: "",
      status: "to-do",
      priority: "low",
      deadline: ""
    });
    setIsModalOpen(false);
    alert("Tugas baru berhasil ditambahkan!");
  };

  const handleDelete = (id, title) => {
    const isConfirmed = window.confirm(`Apakah kamu yakin ingin menghapus tugas "${title}"?`);
    if (isConfirmed) {
      onDeleteTodo(id);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="title-with-icon">
            <h1>Todo List</h1>
            <img src={titleIcon} alt="Icon Judul" className="title-icon" />
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          Tambah Todo
        </button>
      </div>

      {/* Tabel Todo */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>Belum ada tugas.</td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.status}</td>
                  <td>{todo.priority}</td>
                  <td>{todo.deadline}</td>
                  <td className="action-buttons">
                    <button
                        className="btn-icon btn-view"
                        onClick={() => navigate(`/todo/${todo.id}`)}
                        title="Lihat Detail"
                    >
                        {/* Ikon Mata SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>

                    <button
                        className="btn-icon btn-delete"
                        onClick={() => handleDelete(todo.id, todo.title)}
                        title="Hapus"
                    >
                        {/* Ikon Tempat Sampah SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                    </button>
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Todo */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Tambah Todo</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Judul</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="to-do">to-do</option>
                    <option value="in progress">in progress</option>
                    <option value="done">done</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Prioritas</label>
                  <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="bottom-footer">
        <p className="footer-quote">
          Little steps every day lead to big achievements.
        </p>
        <img src={cornerIcon} alt="Dekorasi" className="corner-decoration" />
      </div>
    </div>
  );
}