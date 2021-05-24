import { Row, Col, Menu } from "antd";
import { Header} from "antd/lib/layout/layout";
import { Component, ContextType, CSSProperties } from "react";
import logo from '../assets/logga-fs.png'; 
import { ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AddToBadge from "./Badge";
import { UserContext } from "../contexts/UserContext";

class Navbar extends Component {
  context!: ContextType<typeof UserContext>
  static contextType = UserContext;

  handleLogout = async (history: any) => {
    const { logoutUser } = this.context;
    const ok = await logout();
    if (ok) {
      logoutUser();
      history.push('/login');
    } else {
      alert('Problem logging out, try again')
    }
  }



  render() { 
  return (
    <UserContext.Consumer>
       {({ isLoggedIn }) => { 
    <Header style={layoutStyle}>
      <Row style={{ width: '100%' }}>
        <Col span={8}>
          <Link to='/'>
            <img src={logo} alt="logo" style={logoStyle} />
          </Link>
        </Col>
        <Col span={10} offset={6}>
          <Menu mode="horizontal" style={menuStyle}>
            <Menu.Item key="1"><Link to='/cart' style={{ color: 'white' }} >
            <ShoppingCartOutlined style={iconStyle}/> </Link>  
              <AddToBadge />
            </Menu.Item> 
            <Menu.Item key="2">
              <Link to='/admin'>
                <h3 style={{ color: 'white', marginTop: '1.5rem' }}>Log in</h3>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header> 
    </UserContext.Consumer>

  )
  }
}

const layoutStyle: CSSProperties = {
  width: '100%', 
  background: 'black',
  height: window.innerWidth > 768 ? '6rem' : '5rem',
  display: 'flex', 
  alignItems:'center',
  justifyItems:'center',
  textDecoration: 'none',
  zIndex: 100,
  borderBottom: 'none',
  position: 'fixed',
}

const logoStyle: CSSProperties = {
  marginLeft: window.innerWidth > 768 ? '-1rem' : '-3rem',
  padding: '2rem',
  width: window.innerWidth > 768 ? '11.5rem' : '8rem',
}

const iconStyle: CSSProperties = {
  color: 'white', 
  fontSize: '2.3rem',
  float: 'right',
  position: 'absolute',
  margin: window.innerWidth > 768 ? '2.3rem -1.6rem' : '2.3rem -1.5rem', 
  boxSizing: 'border-box'
}

const menuStyle: CSSProperties = {
  float: 'right',
  background: 'black', 
  color: 'white', 
  display: 'flex', 
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: window.innerWidth > 768 ? '1.2rem' : '-0.3rem',
  marginRight: window.innerWidth > 768 ? '0' : '-2rem',
}

export default Navbar; 

const logout = async () => {
  try {
      const response = await fetch('/api/logout/', {
        method: 'DELETE',
      });
      return response.ok;
  } catch (error) {
      console.error(error);
  }
}