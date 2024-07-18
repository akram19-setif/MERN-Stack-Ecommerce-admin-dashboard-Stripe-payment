import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pay from "./components/Pay";
import Success from "./pages/Success";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log("current User:", user);
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Login />} />
            <Route
              path='/login'
              element={user ? <Navigate to='/' replace /> : <Login />}
            />
            <Route path='/home' element={<Home />} />
            <Route path='/products' element={<ProductList />}>
              {" "}
              <Route path=':category' element={<ProductList />} />{" "}
            </Route>
            <Route path='/product' element={<Product />}>
              {" "}
              <Route path=':id' element={<Product />} />{" "}
            </Route>
            <Route path='/cart' element={<Cart />} />

            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />} />
            <Route path='/success' element={<Success />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
