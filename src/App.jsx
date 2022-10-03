import "./app.css"
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import { useLayoutEffect } from "react";
import Wishlist from "./pages/Wishlist";

function App() {
  const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
  } 

  return (
    <Router>
      <Wrapper>
      <Routes>
          <Route path="/" element={<Home />} />
            <Route path="products" element={<ProductList />} />
              <Route path="products/:category" element={<ProductList />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="success" element={<Success />} />
          </Routes>
          </Wrapper>
    </Router>
    
  );
}

export default App;
