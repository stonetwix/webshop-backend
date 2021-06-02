import { Component, createContext } from 'react';
import { CartItem } from '../componenets/Cart/CartItemsList';
import { UserInfo } from '../componenets/Cart/InformationForm';
import { PaymentCard } from '../componenets/Cart/PayCard';
import { PaymentKlarna } from '../componenets/Cart/PayKlarna';
import { PaymentSwish } from '../componenets/Cart/PaySwish';
import { DeliveryMethod } from '../componenets/Cart/DeliverySelection';
import { IReceipt } from '../componenets/OrderSuccess/Reciept';
import { Product } from '../componenets/StartPage/ProductCardGrid';
import { Order } from '../componenets/Admin/OrdersList';
import { message } from 'antd';

const emptyUser: UserInfo = {
    name: '',
    email: '',
    phone: '',
    street: '',
    zipcode: '',
    city: '',
}

export type PaymentMethod = PaymentCard | PaymentSwish | PaymentKlarna;

const defaultPayment: PaymentMethod = {
    cardNumber: '',
    expDate: '',
    cardName: '',
    cvc: '',
}

const defaultDeliveryMethod: DeliveryMethod = {
    _id: '',
    company: 'PostNord',
    deliverytime: 24,
    price: 145,
    deliveryDay: '',
}

const emptyReceipt: IReceipt = {
    cart: [],
    deliveryMethod: '',
    totalPrice: 0,
    paymentMethod: defaultPayment,
    userInfo: emptyUser,
}
interface State {
    cart: CartItem[];
    deliveryMethod: DeliveryMethod;
    userInfo: UserInfo;
    paymentInfo: PaymentMethod;
    receipt: IReceipt;
    disablePlaceOrderButton: boolean;
}

interface ContextValue extends State {
    addProductToCart: (product: Product, quantity: number | undefined) => void;
    setDeliveryMethod: (method: DeliveryMethod) => void;
    deleteProductFromCart: (id: string) => void;
    getTotalPrice: () => void;
    getTotalPriceProducts: () => void;
    getBadgeQuantity: () => number;
    updateUserInfo: (userInfo: UserInfo) => void;
    updatePaymentInfo: (paymentInfo: PaymentMethod) => void;
    handlePlaceOrder: (history: any) => void;
}

export const CartContext = createContext<ContextValue>({
    cart: [],
    deliveryMethod: defaultDeliveryMethod,
    userInfo: emptyUser,
    paymentInfo: defaultPayment,
    receipt: emptyReceipt,
    disablePlaceOrderButton: false,
    addProductToCart: () => {},
    setDeliveryMethod: () => {},
    deleteProductFromCart: () => {},
    getTotalPrice: () => {},
    getTotalPriceProducts: () => {},
    getBadgeQuantity: () => 0,
    updateUserInfo: () => {},
    updatePaymentInfo: () => {},
    handlePlaceOrder: () => {},
});

class CartProvider extends Component<{}, State> {

    state: State = {
        cart: [],
        deliveryMethod: defaultDeliveryMethod,
        userInfo: emptyUser,
        paymentInfo: defaultPayment,
        receipt: emptyReceipt,
        disablePlaceOrderButton: false,
    }
    
    componentDidMount() {
        this.setState({ 
            cart: JSON.parse(localStorage.getItem('cartItems') as string) || [],
        });
    }

    addProductToCart = (product: Product, quantity: number | undefined) => {
        let cartItems = this.state.cart;
        const existingCartItem = cartItems.filter((item: CartItem) => item.product._id === product._id);
        if (existingCartItem.length === 0) {
            const cartItem = {product: product, quantity: 1};
            cartItems.push(cartItem);
        } else if (quantity) {
            const cartItem = {product: product, quantity: quantity};
            cartItems = cartItems.map((item: CartItem) => item.product._id === product._id ? cartItem : item);
        } else {
            const cartItem = {product: product, quantity: existingCartItem[0].quantity + 1};
            cartItems = cartItems.map((item: CartItem) => item.product._id === product._id ? cartItem : item);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        this.setState({ cart: cartItems });
        return cartItems;
    }

    setDeliveryMethod = (method: DeliveryMethod) => {
        this.setState({ deliveryMethod: method });
    } 

    deleteProductFromCart = (_id: string) => {
        let cartItems = this.state.cart;
        const newCartItemsList = cartItems.filter((item: CartItem) => item.product._id !== _id);
        localStorage.setItem('cartItems', JSON.stringify(newCartItemsList));
        this.setState({ cart: newCartItemsList });
    }

    getTotalPriceProducts = () => {
        let cartItems = this.state.cart;
        let totalPriceProducts = (
            cartItems
            .map((item: any) => item.product.price * item.quantity)
            .reduce((a: number, b: number) => a + b, 0)
        );
        return totalPriceProducts;
    }

    getTotalPrice = () => {
        let deliveryPrice = this.state.deliveryMethod?.price;
        return this.getTotalPriceProducts() + (deliveryPrice as number);
    }

    getBadgeQuantity = () => {
        let cartItems = this.state.cart;
        let quantity = (
            cartItems
            .map((item: CartItem) => item.quantity)
            .reduce((a: number, b: number) => a + b, 0)
        );
        return quantity;
    }

    updateUserInfo = (userInfo: UserInfo) => {
        this.setState({ userInfo: userInfo });
    }

    updatePaymentInfo = (paymentInfo: PaymentMethod) => {
        this.setState({ paymentInfo: paymentInfo });
    }

    createReceipt = (): IReceipt => {  
       return {
            cart: this.state.cart,
            userInfo: this.state.userInfo,
            deliveryMethod: this.state.deliveryMethod.company,
            totalPrice: this.getTotalPrice(),
            paymentMethod: {...this.state.paymentInfo},
        }
    }

    clearCart = () => {
        this.setState({ 
            deliveryMethod: defaultDeliveryMethod,
            cart: [],
        });
        localStorage.setItem('cartItems', JSON.stringify([]));
    }

    handlePlaceOrder = async (history: any) => {
        this.setState({ disablePlaceOrderButton: true });
        let order: Order;
        const response: any = await addOrder(this.state.cart, this.state.deliveryMethod, this.state.userInfo);
        
        if (!response.ok) {
            const error = await response.json();
            message.error(error.message, 5);
            this.setState({ disablePlaceOrderButton: false });
            return;
        }
        order = await response.json();
        
        this.setState({
            receipt: this.createReceipt(),
        });
        console.log('receipt', this.state.receipt);
        this.clearCart();

        history.push('/ordersuccess/' + order._id);
        this.setState({ disablePlaceOrderButton: false });
    }

    render() {
        return (
            <CartContext.Provider value={{
                cart: this.state.cart,
                deliveryMethod: this.state.deliveryMethod,
                userInfo: this.state.userInfo,
                paymentInfo: this.state.paymentInfo,
                receipt: this.state.receipt,
                disablePlaceOrderButton: this.state.disablePlaceOrderButton,
                addProductToCart: this.addProductToCart,
                setDeliveryMethod: this.setDeliveryMethod,
                deleteProductFromCart: this.deleteProductFromCart,
                getTotalPrice: this.getTotalPrice,
                getTotalPriceProducts: this.getTotalPriceProducts,
                getBadgeQuantity: this.getBadgeQuantity,
                updateUserInfo: this.updateUserInfo,
                updatePaymentInfo: this.updatePaymentInfo,
                handlePlaceOrder: this.handlePlaceOrder,
            }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartProvider;

const addOrder = async (cartProducts: CartItem[], deliveryMethod: DeliveryMethod, deliveryInformation: UserInfo) => {
    try {
        let response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartProducts: cartProducts, 
                deliveryMethod: deliveryMethod,
                deliveryInformation: deliveryInformation,
            })
        });
        return response;
        //TODO: Fix console.error
    } catch (error) {
        console.error(error);
    }
}