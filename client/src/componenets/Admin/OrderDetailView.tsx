import { Component, CSSProperties } from 'react'
import { Row, Col, Card } from 'antd';
import { Order } from './OrdersList';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ErrorPage from "../ErrorPage";
import Spinner from "../../Spinner";


interface State {
    order: Order | undefined;
    loading: boolean;
}

interface Props extends RouteComponentProps<{ _id: string }> {}

class OrderDetails extends Component<Props, State> {
    state: State = {
      order: undefined,
      loading: false,
    };

    async componentDidMount() {
        const orderId = (this.props.match.params as any)._id;
        const result = await getOneOrder(orderId);
        console.log('Result: ', result)
        this.setState({ loading: false });
        if (result?.Response === 'False') {
            return;
        }

        const orderDetails = {
            _id: result._id,
            orderProducts: result.orderProducts,
            user: result.user.email,
            deliveryMethod: result.deliveryMethod.company,
            deliveryInformation: result.deliveryInformation,
            deliveryDay: result.deliveryDay,
            totalPrice: result.totalPrice,
            isShipped: result.isShipped,
            createdAt: result.createdAt

        }
        this.setState({ order: orderDetails });
    }

    render() {
        const { order } = this.state;
        if (this.state.loading) {
            return (
                <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
                    <Spinner />
                </div>
            )
        }
        if (!order) {
          return <ErrorPage />
        }
    
        return (
            <Row>
                <Col span={20} style={colStyle}>
                    <Card title="Order information" style={cardStyle}>
                        <p><strong>Order number:</strong> {order._id}</p>
                        <p><strong>Products: </strong> 
                            {order.orderProducts?.map(p => (p.quantity + ' ' + p.title)).join(', ')}
                        </p>
                        <p><strong>User:</strong> {order.user}</p>
                        <p><strong>Delivery method:</strong> {order.deliveryMethod}</p>
                        <p><strong>Delivery information:</strong> <br/>
                            Name: {order.deliveryInformation?.name}<br/> 
                            Phone: {order.deliveryInformation?.phone}<br/> 
                            E-mail: {order.deliveryInformation?.email}<br/> 
                            Street: {order.deliveryInformation?.street}<br/> 
                            Zipcode: {order.deliveryInformation?.zipcode}<br/> 
                            City: {order.deliveryInformation?.city}<br/> 
                        </p>
                        <p><strong>Delivery day:</strong> {order.deliveryDay}</p>
                        <p><strong>Total price:</strong> SEK {order.totalPrice}</p>
                        <p><strong>Order created:</strong> {order.createdAt.split('T')[0]}</p>
                        <p><strong>Shipping status:</strong> {order.isShipped ? 'Sent' : 'Pending'}</p>
                        
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
    width: '50rem',
    marginBottom: '8rem',
}