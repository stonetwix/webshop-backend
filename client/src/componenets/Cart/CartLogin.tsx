import { Component, CSSProperties } from 'react'
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class CartLogin extends Component {
    render() {
        return (
            <div style={containerStyle}>
                <h3>You need to login to proceed to checkout</h3>
                <Link to='/login'>
                    <Button type="primary">Log in</Button>
                </Link>
            </div>
        )
    }
}

export default CartLogin;

const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: 'auto',
    paddingBottom: "8rem",
}