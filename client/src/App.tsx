import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminEditDetails from "./componenets/Admin/AdminEditDetails";
import AdminList from "./componenets/Admin/AdminList";
import CartView from "./componenets/Cart/CartView";
import Footer2 from "./componenets/Footer";
import Navbar from "./componenets/Navbar";
import OrderSuccessMessage from "./componenets/OrderSuccess/OrderSuccessMessage";
import ProductDetails from "./componenets/ProductDetails/ProductDetails";
import StartPageView from "./componenets/StartPage/StartPageView";
import CartProvider from "./contexts/CartContext";
import UserProvider from "./contexts/UserContext";
import ScrollToTop from "./componenets/ScrollToTop";
import AddNewProduct from "./componenets/Admin/AddNewProduct";
import LoginView from "./componenets/Admin/AdminLoginView";
import SuccessMessage from "./componenets/Admin/RegisterSuccess";
import AdminStartpage from "./componenets/Admin/AdminStartpage";
import OrdersList from "./componenets/Admin/OrdersList";
import OrderDetails from "./componenets/Admin/OrderDetailView";
import UserPage from "./componenets/UserPage";
import UserOrderDetailView from "./componenets/UserOrderDetailView";
import AdminRequestsList from "./componenets/Admin/AdminRequests";
import AddCategory from "./componenets/Admin/AddCategory";

function App() {
  return (
    <CartProvider>
      <UserProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Switch>
            <Route path="/product/:_id" component={ProductDetails} />
            <Route path="/ordersuccess/:_id" component={OrderSuccessMessage} />
            <Route exact path="/" component={StartPageView} />
            <Route path="/cart" component={CartView} />
            <Route path="/login" component={LoginView} />
            <Route path="/admin-start" component={AdminStartpage} />
            <Route path="/admin-list" component={AdminList} />
            <Route exact path="/admin-orders" component={OrdersList} />
            <Route path="/admin-orders/:_id" component={OrderDetails} />
            <Route path="/admin-add-product" component={AddNewProduct} />
            <Route path="/admin-add-category" component={AddCategory} />
            <Route path="/edit-product/:_id" component={AdminEditDetails} />
            <Route path="/registersuccess" component={SuccessMessage} />
            <Route exact path="/profile" component={UserPage} />
            <Route path="/profile/:_id" component={UserOrderDetailView} />
            <Route path="/users-adminrequests" component={AdminRequestsList} />
          </Switch>
          <Footer2 />
        </Router>
      </UserProvider>
    </CartProvider>
  );
}

export default App;
