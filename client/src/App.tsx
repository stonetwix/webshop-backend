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
import ScrollToTop from "./componenets/ScrollToTop";
import AddNewProduct from "./componenets/Admin/AddNewProduct";
import LoginView from "./componenets/Admin/AdminLoginView";

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route path="/product/:_id" component={ProductDetails} />
          <Route path="/ordersuccess" component={OrderSuccessMessage} />
          <Route exact path="/" component={StartPageView} />
          <Route path="/cart" component={CartView} />
          <Route path="/admin" component={LoginView} />
          <Route path="/admin-list" component={AdminList} />
          <Route path="/add-product" component={AddNewProduct} />
          <Route path="/edit-product/:_id" component={AdminEditDetails} />
        </Switch>
        <Footer2 />
      </Router>
    </CartProvider>
  );
}

export default App;
