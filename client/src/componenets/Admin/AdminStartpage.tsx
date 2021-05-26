import { Row, Col, Button } from 'antd';
import { CSSProperties, Component } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingFilled, TagFilled, SettingFilled } from "@ant-design/icons";

  class AdminStartpage extends Component {
    render() {
      return (
        <Row style={adminStyle}>
          <Col span={20} style={{ marginTop: '7rem', marginLeft: '5rem' }}>
            <h1 style={{display: 'flex', justifyContent: 'left', fontWeight: 'bold'}}>ADMIN </h1>
          </Col>
          <Col span={8} style={colStyle}>
              <Link to='/admin-orders' style={colStyle}>
              <Button style={{ padding: '2rem', height: '8rem' }}>
                <ShoppingFilled style={{ fontSize: '2rem' }}/>
                  <h2>Orders</h2>
              </Button>
                <p style={{marginTop: '1rem', textAlign: 'center'}}>View and set status of orders.</p>
              </Link>
          </Col>
          <Col span={8} style={colStyle}>
          <Button style={{ padding: '2rem', height: '8rem' }}>
            <TagFilled style={{ fontSize: '2rem' }}/>
            <Link to='/admin-list'>
              <h2>Products</h2>
            </Link>
          </Button>
            <p style={{marginTop: '1rem', textAlign: 'center'}}>View and edit products.</p>
            </Col>
          <Col span={8} style={colStyle}>
          <Button style={{ padding: '2rem', height: '8rem' }}>
            <SettingFilled style={{ fontSize: '2rem' }}/>
            <Link to='/'>
              <h2>Admin requests</h2>
            </Link>
          </Button>
            <p style={{marginTop: '1rem', textAlign: 'center'}}>Review admin requests.</p>
          </Col>
        </Row>
      )
    }
  }

export default AdminStartpage; 
  
const adminStyle: CSSProperties = {
  display: 'flex',
  padding: '1rem',
}

const colStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '5rem',
}