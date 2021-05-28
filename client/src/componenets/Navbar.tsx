import { Row, Col, Menu, Button, message } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Component, ContextType, CSSProperties } from "react";
import logo from '../assets/logga-fs.png'; 
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Route } from 'react-router-dom';
import AddToBadge from "./Badge";
import { UserContext } from "../contexts/UserContext";


const error = () => {
  message.error('Problem logging out, try again', 3);
};
class Navbar extends Component {
  context!: ContextType<typeof UserContext>
  static contextType = UserContext;
  
  handleLogout = async (history: any) => {
    const { logoutUser } = this.context;
    const ok = await logout();
    if (ok) {
      logoutUser();
      history.push('/');
    } else {
      error();
    }
  }

  render() {
    return (
      <UserContext.Consumer> 
        {({ isLoggedIn }) => {
          const userMenuItem = !isLoggedIn ?
          <Menu.Item key="2">
            <Link to='/login'>
                <h3 style={{ color: 'white', marginTop: '1.5rem' }}>Log in</h3>
            </Link>
            </Menu.Item> :
            <Route render={({ history }) => (
              <>
                <Menu.Item key="3">
                    <UserOutlined style={iconStyleUser}
                      onClick={() => { 
                        const { isAdmin } = this.context;
                        if (isAdmin) {
                          history.push('/admin-start')
                        } else {
                          history.push('/profile')
                        }
                      }}
                    />
                </Menu.Item>
                <Menu.Item key="4">

                  <Button style={buttonStyle}
                    onClick={() => this.handleLogout(history)}
                  > 
                    Log out 
                  </Button>
                </Menu.Item>

              </>
           )}/> 
           
          return (
            <Header style={layoutStyle}>
              <Row style={{ width: '100%' }}>
                <Col span={8}>
                  <Link to='/'>
                    <img src={logo} alt="logo" style={logoStyle} />
                  </Link>
                </Col>
                <Col span={10} offset={6}>
                  <Menu mode="horizontal" style={menuStyle}>
                    <Menu.Item key="1">
                      <Link to='/cart' style={{ color: 'white' }} >
                        <ShoppingCartOutlined style={iconStyle}/> 
                      </Link>  
                      <AddToBadge />
                    </Menu.Item> 
                    {userMenuItem}
                  </Menu>
                </Col>
              </Row>
            </Header> 
          )
        }}
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

const menuStyle: CSSProperties = {
  background: 'black', 
  color: 'white', 
  display: 'flex', 
  justifyContent: 'space-evenly',
  alignItems: 'center',
  marginTop: window.innerWidth > 768 ? '1.2rem' : '-0.3rem',
  marginRight: window.innerWidth > 768 ? '0' : '-2rem',
}

const iconStyle: CSSProperties = {
  color: 'white', 
  fontSize: '2.3rem',
  float: 'right',
  position: 'absolute',
  alignItems: 'center',
  margin: window.innerWidth > 768 ? '2rem -1.6rem' : '2.3rem -1.5rem', 
  boxSizing: 'border-box',
}

const buttonStyle: CSSProperties = {
  borderRadius: '10rem',
  float: 'right',
  margin: window.innerWidth > 768 ? '2rem -1.6rem' : '2.3rem -1.5rem', 
}

const iconStyleUser: CSSProperties = {
  color: 'white', 
  fontSize: '1.8rem',
  borderRadius: '10rem',
  marginLeft: '3rem',
  margin: window.innerWidth > 768 ? '2rem -1.6rem' : '2.3rem -1.5rem', 
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