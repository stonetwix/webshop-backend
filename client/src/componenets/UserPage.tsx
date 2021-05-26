import { Component, CSSProperties } from 'react';
import { Table, Select, Space } from 'antd';
const { Column } = Table;

const data = [
    {
      orderNumber: '7t3g48372',
      products: 'VOLUMINOUS BELTED COAT, BREEZY JUMPSUIT',
      delivery: 'Bring',
      totalPrice: 899,
      status: 'Under process'
    },
    {
      orderNumber: '673y43q84',
      products: 'HIGH WAIST TROUSERS',
      delivery: 'DB Schenker',
      totalPrice: 2299,
      status: 'sent'
    },
    {
      orderNumber: '5id9f8900',
      products: 'VOLUMINOUS BELTED COAT, BREEZY JUMPSUIT',
      delivery: 'PostNord',
      totalPrice: 1899,
      status: 'sent'
    },
    {
      orderNumber: '68s4t2yh9',
      products: 'BASIC TEE WITH PRINT',
      delivery: 'Bring',
      totalPrice: 299,
      status: 'sent'
    },
  ];

class UserPage extends Component {
    render() {
        return (
            <div style={orderListStyle}>
            <h1 style={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}}>My orders</h1>
            <Table dataSource={data}>
              <Column title="Order number" dataIndex="orderNumber" key="orderNumber" />
              <Column title="Products" dataIndex="products" key="products" />
              <Column title="Delivery method" dataIndex="delivery" key="delivery" />
              <Column title="Total price" dataIndex="totalPrice" key="totalPrice" />
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