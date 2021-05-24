import { List, Row, Col } from 'antd';
import { CSSProperties, Component } from 'react';
import { Link } from 'react-router-dom';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const data = [
    {
      title: 'Orders',
      description: 'View and set status of orders.'
    },
    {
      title: 'Products',
      description: 'View and edit products.'
    },
    {
      title: 'Users',
      description: 'Review admin requests.'
    },
  ];


  class AdminStartpage extends Component {
      render() {
          return (
            <div>
                <Row>
                    <Col span={24}>
                        <h1 style={{display: 'flex', justifyContent: 'center', fontWeight: 'bold', padding: '10rem'}}>ADMIN </h1>
                            <h2>Orders</h2>
                            <p>View and set status of orders.</p>
                            <h2>Products</h2>
                            <p>View and edit products.</p>
                            <h2>Admin requests</h2>
                            <p>Review admin requests.</p>
                    </Col>
                </Row>
            </div> 

          )
      }
  }

  export default AdminStartpage; 