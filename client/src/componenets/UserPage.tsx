import { Component, CSSProperties } from 'react';
import { Table } from 'antd';
const { Column } = Table;

interface Order {
    _id: string;
    deliveryMethod: string;
    totalPrice: number;
    isShipped: boolean;
    createdAt: string;
  }
  interface State {
    orders: Order[];
  }


// const data = [
//     {
//       orderNumber: '7t3g48372',
//       products: 'VOLUMINOUS BELTED COAT, BREEZY JUMPSUIT',
//       delivery: 'Bring',
//       totalPrice: 899,
//       status: 'Under process'
//     },
//     {
//       orderNumber: '673y43q84',
//       products: 'HIGH WAIST TROUSERS',
//       delivery: 'DB Schenker',
//       totalPrice: 2299,
//       status: 'sent'
//     },
//     {
//       orderNumber: '5id9f8900',
//       products: 'VOLUMINOUS BELTED COAT, BREEZY JUMPSUIT',
//       delivery: 'PostNord',
//       totalPrice: 1899,
//       status: 'sent'
//     },
//     {
//       orderNumber: '68s4t2yh9',
//       products: 'BASIC TEE WITH PRINT',
//       delivery: 'Bring',
//       totalPrice: 299,
//       status: 'sent'
//     },
//   ];

class UserPage extends Component<{}, State> {

    state: State = {
        orders: [],
      }
      
      async componentDidMount() {
        const orders = await getUserOrders();
        this.setState({ orders: orders });
        console.log(this.state.orders);
      }

    render() {
        return (
            <div style={orderListStyle}>
            <h1 style={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}}>My orders</h1>
            <Table dataSource={this.state.orders}>
                <Column title="Order number" dataIndex="_id" key="_id" />
                <Column title="Delivery method" dataIndex={["deliveryMethod", "company"]} key="delivery" />
                <Column title="Total price" dataIndex="totalPrice" key="totalPrice" />
                <Column title="Created" dataIndex="createdAt" key="totalPrice" />
                <Column title="Status" dataIndex="status" key="status" />
            </Table>
          </div>

        )
    }
}

export default UserPage;


const orderListStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10rem',
    margin: '1rem'
  }

  const getUserOrders = async () => {
    try {
        let response = await fetch('/api/user-orders');
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
  }