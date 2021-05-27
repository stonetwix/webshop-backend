import { Component, CSSProperties } from 'react'
import { Row, Col, Card } from 'antd';
import { Order } from './OrdersList';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ErrorPage from "../ErrorPage";


interface State {
    order: Order | undefined;
}

interface Props extends RouteComponentProps<{ _id: string }> {}

class OrderDetails extends Component<Props, State> {
    state: State = {
      order: undefined
    };

    async componentDidMount() {
        const orderId = (this.props.match.params as any)._id;
        const result = await getOneOrder(orderId);

        const orderDetails = {
            _id: result._id,
            orderProducts: result.orderProducts.title,
            user: result.user.email,
            deliveryMethod: result.deliveryMethod.company,
            deliveryInformation: result.deliveryInformation.addess,
            deliveryDay: result.deliveryDay,
            totalPrice: result.totalPrice,
            isShipped: result.isShipped,
            createdAt: result.createdAt

        }
        this.setState({ order: orderDetails });
    }

    render() {
        const { order } = this.state;
    
        if (!order) {
          return <ErrorPage />
        }
    
        return (
            <Row>
                <Col span={20} style={colStyle}>
                    <Card title="Order information" style={cardStyle}>
                        <p><strong>Order number:</strong> {order._id}</p>
                        <p><strong>Products:</strong> {order.orderProducts}</p>
                        <p><strong>User:</strong> {order.user}</p>
                        <p><strong>Delivery method:</strong> {order.deliveryMethod}</p>
                        <p><strong>Delivery information:</strong> {order.deliveryInformation}</p>
                        <p><strong>Delivery day:</strong> {order.deliveryDay}</p>
                        <p><strong>Total price:</strong> SEK {order.totalPrice}</p>
                        <p><strong>Is shipped:</strong> {order.isShipped}</p>
                        <p><strong>Order created:</strong> {order.createdAt.split('T')[0]}</p>
                        
                    </Card>
                </Col>
            </Row>
        )
    }

}

export default withRouter(OrderDetails);


const getOneOrder = async (_id: string) => {
    try {
      let response = await fetch('/api/orders/' + _id);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
        console.error(error);
    }
  }

const colStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10rem',
    margin: '1rem',
    width: '80%'
}

const cardStyle: CSSProperties = {
    width: '50rem'
}