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
          <Route path="/add-product" component={AddNewProduct} />
          <Route path="/edit-product/:_id" component={AdminEditDetails} />
          <Route path="/registersuccess" component={SuccessMessage} />
          <Route path="/profile" component={UserPage} />
        </Switch>
        <Footer2 />
      </Router>
      </UserProvider>
    </CartProvider>
  );
}

export default App;
