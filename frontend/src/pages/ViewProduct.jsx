import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get('/task');
      if (response.data.status) {
        setProducts(response.data.records || []);
      }
    } catch (error) {
      toast.error('Failed to fetch products');
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
      title: 'Delete Product?',
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
        toast.success('Product deleted');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditName(product.name);
    setEditCategoryId(product.category_id);
    setEditStatus(product.status);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await API.put(`/task/${id}`, {
        category_id: editCategoryId,
        name: editName,
        status: editStatus
      });

      if (response.data.status) {
        toast.success('Product updated');
        setEditingId(null);
        fetchProducts();
      }
    } catch (error) {
      toast.error('Failed to update product');
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
        <h2 className="fw-semibold">Products</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/add-product')}
        >
          Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-info">No products found. Create one!</div>
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
              {products.map((product) => (
                <tr key={product._id}>
                  {editingId === product._id ? (
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
                          onClick={() => handleUpdate(product._id)}
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
                      <td>{product.name}</td>
                      <td>{getCategoryName(product.category_id)}</td>
                      <td>
                        <span
                          className={`badge ${
                            product.status ? 'bg-success' : 'bg-danger'
                          }`}
                        >
                          {product.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => handleDelete(product._id)}
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
