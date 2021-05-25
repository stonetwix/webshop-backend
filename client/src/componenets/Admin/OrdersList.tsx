import React, { Component, CSSProperties } from 'react'
import { Table, Space } from 'antd';


const { Column } = Table;

const data = [
    {
      orderNumber: '7t3g48372',
      products: 'VOLUMINOUS BELTED COAT, BREEZY JUMPSUIT',
      customer: 'Amanda Samuelsson',
      delivery: 'Bring',
      totalPrice: 899
    },
    {
      orderNumber: '673y43q84',
      products: 'HIGH WAIST TROUSERS',
      customer: 'Moa Stenqvist',
      delivery: 'DB Schenker',
      totalPrice: 2299
    },
    {
      orderNumber: '5id9f8900',
      products: 'VOLUMINOUS BELTED COAT, BREEZY JUMPSUIT',
      customer: 'Malin Österberg',
      delivery: 'PostNord',
      totalPrice: 1899
    },
    {
      orderNumber: '68s4t2yh9',
      products: 'BASIC TEE WITH PRINT',
      customer: 'David Jensen',
      delivery: 'Bring',
      totalPrice: 299
    },
  ];

class OrdersList extends Component {
  
    render () {
        return (
          <div style={orderListStyle}>
            <Table dataSource={data}>
              <Column title="Order number" dataIndex="orderNumber" key="orderNumber" />
              <Column title="Products" dataIndex="products" key="products" />
              <Column title="Customer" dataIndex="customer" key="customer" />
              <Column title="Delivery method" dataIndex="delivery" key="delivery" />
              <Column title="Total price" dataIndex="totalPrice" key="totalPrice" />
            </Table>
          </div>
 
        )
    }
}

export default OrdersList;

const orderListStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '10rem',
}
