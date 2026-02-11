import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

export default function ViewTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/task');
      if (response.data.status) {
        setTasks(response.data.records || []);
      }
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await API.get('/category');
      if (response.data.status) {
        setCategories(response.data.records || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Task?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Delete'
    });

    if (!result.isConfirmed) return;

    try {
      const response = await API.delete(`/task/${id}`);
      if (response.data.status) {
        toast.success('Task deleted');
        fetchTasks();
      }
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditName(task.name);
    setEditCategoryId(task.category_id);
    setEditStatus(task.status);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await API.put(`/task/${id}`, {
        category_id: editCategoryId,
        name: editName,
        status: editStatus
      });

      if (response.data.status) {
        toast.success('Task updated');
        setEditingId(null);
        fetchTasks();
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : 'N/A';
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-semibold">Tasks</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/add-task')}
        >
          Add New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks found. Create one!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  {editingId === task._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      </td>
                      <td>
                        <select
                          className="form-control"
                          value={editCategoryId}
                          onChange={(e) => setEditCategoryId(e.target.value)}
                        >
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={editStatus}
                          onChange={(e) => setEditStatus(e.target.checked)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleUpdate(task._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm ms-2"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{task.name}</td>
                      <td>{getCategoryName(task.category_id)}</td>
                      <td>
                        <span
                          className={`badge ${
                            task.status ? 'bg-success' : 'bg-danger'
                          }`}
                        >
                          {task.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
