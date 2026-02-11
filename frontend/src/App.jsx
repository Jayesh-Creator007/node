import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import AddCategory from './pages/Addcategory';
import ViewCategory from './pages/Viewcategory';




function App() {
  return (
    <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/categories" element={<ViewCategory />} />
            
            </Routes>
    </Router>
  );
}

export default App;