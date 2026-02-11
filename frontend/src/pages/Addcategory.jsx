import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';


export default function AddCategory() {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        setLoading(true);

        try {
            const response = await API.post('/category', { name, status });


        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="container mt-4">
            <h2 className="fw-semibold mb-3">Add Category</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="statusCheck"
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                    />
                    <label htmlFor="statusCheck" className="form-check-label">
                        Active
                    </label>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>Add Category</button>

            </form>
        </div>
    );
}