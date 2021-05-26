import { Row } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import CartItemsList from './CartItemsList';
import { CartContext } from '../../contexts/CartContext';



class CartSummary extends Component { 
    context!: ContextType<typeof CartContext>
    static contextType = CartContext;

    render() {
        return (
            <CartContext.Consumer>
                {({ getTotalPriceProducts }) => {
                    return (
                        <Row style={cartViewContainerStyle}>
                            <CartItemsList />
                            <h3 style={priceTextStyle}>Price products: {getTotalPriceProducts()  + ' kr '}</h3>
                        </Row>
                    );    
                }}
            </CartContext.Consumer>
        )
    }
}

export default CartSummary;


const cartViewContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    margin: 'auto',
    paddingBottom: "8rem",
}

const priceTextStyle: CSSProperties = {
    textAlign: 'center',
    marginTop: '1rem'
}