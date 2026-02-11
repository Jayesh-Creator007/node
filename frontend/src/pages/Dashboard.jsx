import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <h2 className="fw-bold mb-4">Dashboard</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Categories</h5>
                    <p className="card-text">Manage your categories</p>
                    <button className="btn btn-primary" onClick={() => navigate('/add-category')}>
                      Add Category
                    </button>
                    <button className="btn btn-info ms-2" onClick={() => navigate('/categories')}>
                      View Categories
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Products</h5>
                    <p className="card-text">Manage your products</p>
                    <button className="btn btn-primary" onClick={() => navigate('/add-product')}>
                      Add Product
                    </button>
                    <button className="btn btn-info ms-2" onClick={() => navigate('/products')}>
                      View Products
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Tasks</h5>
                    <p className="card-text">Manage your tasks</p>
                    <button className="btn btn-primary" onClick={() => navigate('/add-task')}>
                      Add Task
                    </button>
                    <button className="btn btn-info ms-2" onClick={() => navigate('/tasks')}>
                      View Tasks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
