import { Component, CSSProperties } from 'react'
import { Table, Space, Row, Col, Button } from 'antd';
import { Link } from "react-router-dom";
import { Product } from '../StartPage/ProductCardGrid';

const { Column } = Table;

interface DeliveryInformation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  zipcode: string;
  city: string;
}
export interface Order {
  _id: string;
  orderProducts?: Product[];
  user: string;
  deliveryMethod: string;
  deliveryInformation?: DeliveryInformation;
  deliveryDay: string;
  totalPrice: number;
  isShipped: boolean;
  createdAt: string;
}
interface State {
  orders: Order[];
}

const columns = [
  {
    title: 'Order number',
    dataIndex: '_id',
    key: '_id',
    render: (text: string, record: Order) => (
      <Link to={'/admin-orders/' + record._id}>{text}</Link>
    ),
  },
  {
    title: 'Customer',
    dataIndex: ["user", "email"],
    key: 'customer',
  },
  {
    title: 'Delivery method',
    dataIndex: ["deliveryMethod", "company"],
    key: 'delivery',
  },
  {
    title: 'Total price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    key: 'created',
  },
  {
    title: 'Status',
    key: 'action',
    render: (record: Order) => (
      <Space size="middle">
        <Button onClick={() => {}}>Mark as sent</Button>
      </Space>
    ),
  },
];

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
        <Col span={20}>
         <h1 style={{fontWeight: 'bold'}}>ADMIN ORDERS</h1>
         <Table columns={columns} dataSource={this.state.orders} pagination={false} />
        </Col>
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