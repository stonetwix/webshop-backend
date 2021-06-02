import { Component, CSSProperties } from 'react';
import { Table, Row, Col } from 'antd';
import { CheckCircleFilled, ClockCircleOutlined } from '@ant-design/icons';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Order } from './Admin/OrdersList';
interface State {
  orders: Order[];
}

interface Props extends RouteComponentProps<{ id: string }> {}
class UserPage extends Component<Props, State> {

  state: State = {
      orders: [],
  }
    
  columns = [
    {
      title: 'Order number',
      dataIndex: '_id',
      key: '_id',
      render: (text: string, record: Order) => (
        <Link to={'/profile/' + record._id}>{text}</Link>
      ),
    },
    {
      title: 'Delivery method',
      dataIndex: ["deliveryMethod", "company"],
      key: 'delivery',
    },
    {
      title: 'Total price',
      key: 'totalPrice',
      render: (record: Order) => {
        return 'SEK ' + record.totalPrice
      }
    },
    {
      title: 'Created',
      key: 'created',
      render: (record: Order) => {
        return record.createdAt.split('.')[0].split('T').join(' ');
      }
    },
    {
      title: 'Shipping status',
      key: 'shippingStatus',
      render: (record: Order) => {
        if (!record.isShipped) {
          return(
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ClockCircleOutlined style={{ fontSize: '2rem', color: '#636363' }}/>
                <p>Processing</p>
            </div>
          )
        } else {
          return (
            <CheckCircleFilled style={{ fontSize: '2rem', color: '#8FBC94', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}/>
          )
        }
      }
    }
  ];
    
  async componentDidMount() {
    const orders = await getOrders();
    this.setState({ orders: orders });
  }

  render () {
    if (!this.state.orders) {
      return <div></div>
    }
    return (
      <Row style={orderListStyle}>
        <Col span={20}>
          <h1 style={{fontWeight: 'bold'}}>My orders</h1>
          <Table columns={this.columns} dataSource={this.state.orders} pagination={false} />
        </Col>
      </Row>
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

const getOrders = async () => {
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