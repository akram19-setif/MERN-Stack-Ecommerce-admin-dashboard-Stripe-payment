import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Login from "./pages/Login/Login";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { isAdmin } = useSelector((state) => state?.user.currentUser) || false;
  return (
    <Router>
      {isAdmin ? (
        <>
          {" "}
          <Topbar />
          <div className='container'>
            <Sidebar />
            <Switch>
              <Route
                exact
                path='/'
              >
                <Home />
              </Route>
              <Route path='/users'>
                <UserList />
              </Route>
              <Route path='/user/:userId'>
                <User />
              </Route>
              <Route path='/newUser'>
                <NewUser />
              </Route>
              <Route path='/products'>
                <ProductList />
              </Route>
              <Route path='/product/:productId'>
                <Product />
              </Route>
              <Route path='/newproduct'>
                <NewProduct />
              </Route>
            </Switch>
          </div>
        </>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
