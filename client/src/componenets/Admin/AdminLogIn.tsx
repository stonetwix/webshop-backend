import { Form, Input, Button, message, Row, Col } from 'antd';
import { CSSProperties, Component, ContextType } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const error = () => {
  message.error('Not valid e-mail or password', 3);
};
class AdminLogIn extends Component {
  context!: ContextType<typeof UserContext>
  static contextType = UserContext;

  onFinish = async (values: any, history: any) => {
    const { setUser } = this.context;
    const user = await login(values.email, values.password);
    console.log('User from LogIn: ', user)
    if (user) {
      setUser(user.email, user.role === 'admin');
      const { isAdmin } = this.context;
      console.log('User after SET USER: ', user, this.context.isAdmin)
      if (isAdmin) {
        history.push('/admin-start');
      } else {
        history.goBack();
      }
    } else {
      error(); 
    }
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
    
  render() {
    return (
      <div> 
        <Row style={ContainerStyle}>
          <Col span={24} style={columnStyle}>
            <h1 style={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}}>LOG IN </h1>
            <Route render={({ history }) => (
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => this.onFinish(values, history)}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid email',
                  },
                  { 
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
      
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
        
              <Form.Item {...tailLayout}>        
                
                  <Button type="primary" htmlType="submit" style={buttonStyle}>
                    Log in 
                  </Button> 
              </Form.Item>
            </Form>
             )}/>
          </Col>
        </Row>
      </div> 
    );
  }
}

const ContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'space-around',
  width: '60%',
  margin: 'auto',
}

const columnStyle: CSSProperties = {
  marginTop: '11rem',
  marginBottom: '-5rem'
 
}

const buttonStyle: CSSProperties = {
  marginBottom: '10rem'
}

export default AdminLogIn; 

const login = async (email: string, password: string) => {
  try {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
  } catch (error) {
      console.error(error);
  }
}