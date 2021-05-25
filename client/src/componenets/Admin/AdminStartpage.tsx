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



  class AdminStartpage extends Component {
      render() {
          return (
            <div>
                <Row>
                    <Col span={24}>
                          <div style={adminStyle}>
                            <h1 style={{display: 'flex', justifyContent: 'left', fontWeight: 'bold'}}>ADMIN </h1>
                            <Link to='/'>
                              <h2>Orders</h2>
                            </Link>
                              <p>View and set status of orders.</p>
                            <Link to='/admin-list'>
                              <h2>Products</h2>
                            </Link>
                              <p>View and edit products.</p>
                            <Link to='/'>
                              <h2>Admin requests</h2>
                            </Link>
                              <p>Review admin requests.</p>
                          </div>
                    </Col>
                </Row>
            </div> 

          )
      }
  }

  export default AdminStartpage; 

  
  const adminStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    marginLeft: '10rem',
    marginTop: '7rem'
  }