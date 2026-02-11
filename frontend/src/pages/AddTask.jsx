import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';
import Navbar from '../components/Navbar';

export default function AddTask() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get('/category');
      if (response.data.status) {
        setCategories(response.data.records || []);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post('/task', {
        category_id: categoryId,
        name,
        status
      });

      if (response.data.status) {
        toast.success('Task added successfully!');
        navigate('/tasks');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="fw-semibold mb-4">Add Task</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Task Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter task name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={loading}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="status"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                disabled={loading}
              />
              <label className="form-check-label" htmlFor="status">
                Active
              </label>
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Task'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/tasks')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
