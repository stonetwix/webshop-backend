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
        <Col lg={8} style={colStyle}>
          <Button style={{ padding: '2rem', height: '8rem' }}>
            <Link to='/admin-orders'>
              <ShoppingFilled style={{ fontSize: '2rem' }}/>
              <h2>Orders</h2>
            </Link>
          </Button>
          <p style={{marginTop: '1rem'}}>View and set status orders.</p>
        </Col>
        <Col lg={8} style={colStyle}>
          <Button style={{ padding: '2rem', height: '8rem'}}>
            <Link to='/admin-list'>
              <TagFilled style={{ fontSize: '2rem' }}/>
              <h2>Products</h2>
            </Link>
          </Button>
          <p style={{marginTop: '1rem'}}>View and edit products.</p>
        </Col>
        <Col lg={8} style={colStyle}>
          <Button style={{ padding: '2rem', height: '8rem'}}>
            <Link to='/users-adminrequests'>
              <SettingFilled style={{ fontSize: '2rem' }}/>
              <h2>Admin requests</h2>
            </Link>
          </Button>
          <p style={{marginTop: '1rem', marginBottom: '8rem'}}>Review admin requests.</p>
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
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '3rem',
}