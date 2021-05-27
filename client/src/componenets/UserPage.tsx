import React, { Component, CSSProperties } from 'react';
import { Table, Row, Col, Space } from 'antd';
import { CheckCircleFilled, ClockCircleOutlined } from '@ant-design/icons';
import { Product } from './StartPage/ProductCardGrid';
import { Link, RouteComponentProps } from 'react-router-dom';




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
            <Link to={'/admin-orders/' + record._id}>{text}</Link>
          ),
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
          key: 'created',
          render: (record: Order) => {
            //return dayjs(record.createdAt).locale();
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
         
  
        
        // {
        //   title: 'Shipping status',
        //   key: 'shippingStatus',
        //   render: (record: Order) => {
        //     if (!record.isShipped) {
        //       return(
        //         console.log('hej')

        //         // <Space size="middle">
        //         //   <Button onClick={() => this.handleMarkAsSentClick(record._id)}>Mark as sent</Button>
        //         // </Space>
        //       )
        //     } else {
        //       return (
        //           console.log('hej')
        //         // <CheckCircleFilled style={{ fontSize: '2rem', color: '#8FBC94' }}/>
        //       )
        //     }
        //   }
        // }
      ];
    
      async componentDidMount() {
        const orders = await getUserOrders();
        this.setState({ orders: orders });
        console.log(this.state.orders);
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