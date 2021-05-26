import { Component, CSSProperties } from 'react'
import { Table, Space, Row } from 'antd';

const { Column } = Table;
interface Order {
  _id: string;
  customerName: string;
  deliveryMethod: string;
  totalPrice: number;
  isShipped: boolean;
  createdAt: string;
}
interface State {
  orders: Order[];
}

class OrdersList extends Component<{}, State> {

  state: State = {
    orders: [],
  }

  async componentDidMount() {
    const orders = await getAllOrders();
    this.setState({ orders: orders });
    console.log(this.state.orders);
  }
  
  render () {
    return (
      <Row style={orderListStyle}>
        <Table dataSource={this.state.orders}>
          <Column title="Order number" dataIndex="_id" key="_id" />
          <Column title="Customer" dataIndex={["deliveryInformation", "name"]} key="customer" />
          <Column title="Delivery method" dataIndex={["deliveryMethod", "company"]} key="delivery" />
          <Column title="Total price" dataIndex="totalPrice" key="totalPrice" />
          <Column title="Created" dataIndex="createdAt" key="totalPrice" />
          <Column
            title="Status"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a>Mark as sent</a>
                {/* <a onClick={() => this.handleSent()}>Mark as sent</a> */}
              </Space>
            )}
          />
        </Table>
      </Row>
    )
  }
}

export default OrdersList;

const orderListStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '10rem',
  margin: '1rem'
}

const getAllOrders = async () => {
  try {
      let response = await fetch('/api/orders');
      if (response.ok) {
          const data = await response.json();
          return data;
      }
  } catch (error) {
      console.error(error);
  }
}