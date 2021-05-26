import { Component, ContextType } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import CartLogin from './CartLogin';
import CartSteps from './CartSteps';
import CartSummary from './CartSummary';


class CartView extends Component {

    context!: ContextType<typeof UserContext>
    static contextType = UserContext;
  
    render() {

        return(
            <UserContext.Consumer>
            {({ isLoggedIn }) => {
                    const userLoginItem = !isLoggedIn ?
                    <div>
                        <CartLogin />
                    </div> :
                        <Route render={() => (
                            <>
                                <CartSteps />
                            </>
                            )}/>               

            return (
                <div>
                    <CartSummary />
                    {userLoginItem}
                </div>
            )
            }}
            </UserContext.Consumer>
        )
    }
}

export default CartView;