import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css'
import ProductList from './ProductList'
import AddProductForm from './AddProductForm';
import ShowProduct from './ShowProduct';
import EditProductForm from './EditProductForm';
import Home from './Home';
import Cart from './Cart';


function App() {




  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/add" element={<AddProductForm />} />
        <Route path="/show/:id" element={<ShowProduct />} />
        <Route path="/product/:category" element={<ProductList />} />


        <Route path="/edit/:id" element={<EditProductForm />} />


      </Routes>

    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

