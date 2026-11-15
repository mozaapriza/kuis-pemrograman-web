import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TodoDetail({ todos, onUpdateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const todo = todos.find((item) => String(item.id) === String(id));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(
    todo || { title: "", description: "", status: "to-do", priority: "low", deadline: "" }
  );

  if (!todo) {
    return (
      <div className="container">
        <p>Tugas tidak ditemukan.</p>
        <button className="btn-danger" onClick={() => navigate("/")}>Kembali</button>
      </div>
    );
  }

  const handleOpenModal = () => {
    setFormData({ ...todo });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTodo(formData);
    setIsModalOpen(false);
    alert("Tugas berhasil diperbarui!");
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-card">
        <div className="detail-left">
          <div className="detail-item">
            <h3>Judul</h3>
            <p>{todo.title}</p>
          </div>
          <div className="detail-item">
            <h3>Deskripsi</h3>
            <div className="description-box">{todo.description}</div>
          </div>
        </div>

        <div className="detail-right">
          <div className="detail-item">
            <h3>Status</h3>
            <p>{todo.status}</p>
          </div>
          <div className="detail-item">
            <h3>Prioritas</h3>
            <p>{todo.priority}</p>
          </div>
          <div className="detail-item">
            <h3>Deadline</h3>
            <p>{todo.deadline}</p>
          </div>

          <div className="detail-actions">
            <button className="btn-danger" onClick={() => navigate("/")}>
              Kembali
            </button>
            <button className="btn-primary" onClick={handleOpenModal}>
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Modal Update Todo */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Update Todo</h2>
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}