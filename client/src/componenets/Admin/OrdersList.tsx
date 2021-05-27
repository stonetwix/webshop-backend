import { Component, CSSProperties } from 'react'
import { Table, Space, Row, Col, Button } from 'antd';
import { Link, RouteComponentProps } from "react-router-dom";
import { Product } from '../StartPage/ProductCardGrid';
import { CheckCircleFilled } from '@ant-design/icons';

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

interface Props extends RouteComponentProps<{ id: string }> {}

class OrdersList extends Component<Props, State> {

  state: State = {
    orders: [],
  }

  columns = [
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
      dataIndex: 'createdAt'.split('T')[0],
      key: 'created',
    },
    {
      title: 'Shipping status',
      key: 'action',
      render: (record: Order) => {
        if (!record.isShipped) {
          return(
            <Space size="middle">
              <Button onClick={() => this.handleMarkAsSentClick(record._id)}>Mark as sent</Button>
            </Space>
          )
        } else {
          return (
            <CheckCircleFilled style={{ fontSize: '2rem', color: '#8FBC94' }}/>
          )
        }
      }
    }
  ];

  async componentDidMount() {
    const orders = await getAllOrders();
    this.setState({ orders: orders });
    console.log(this.state.orders);
  }

  handleMarkAsSentClick = async (_id: string) => {
    await udateShippingStatus(_id);
    const orders = await getAllOrders();
    this.setState({ orders: orders });
  }
  
  render () {
    if (!this.state.orders) {
      return <div></div>
    }
    return (
      <Row style={orderListStyle}>
        <Col span={20}>
         <h1 style={{fontWeight: 'bold'}}>ADMIN ORDERS</h1>
         <Table columns={this.columns} dataSource={this.state.orders} pagination={false} />
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

const udateShippingStatus = async (_id: string) => {
  try {
      await fetch('/api/orders/' + _id + '/isShipped', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isShipped: true })
      });
  } catch (error) {
      console.error(error);
  }
}