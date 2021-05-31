import { Form, Input, Button, Row, Col, Divider, message, Select } from "antd";
import { CSSProperties, Component } from "react";
import { Route } from "react-router-dom";

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
  message.error('E-mail already exists, or not a valid e-mail', 3);
};
class Register extends Component {

  onFinish = async (values: any, history: any) => {
    const registeredUser = await register(values.email, values.password, values.role);
    console.log(registeredUser);
    if (registeredUser) {
      history.push('/registersuccess');
    } else {
       error();
    }
  };

  onSelectChange = (value: any) => {
    this.setState({ isAdmin: value === 'admin' });
  }

  render() {
    return (
      <Row style={containerStyle}>
        <Col span={24}>
          <Divider plain>Or</Divider>
          <div style={{ display: "flex", justifyContent: "center"}}>
            <h1 style={{ fontWeight: "bold", marginTop: '2rem', lineHeight: '80%' }}>
              NOT YET REGISTERED?
            </h1>
          </div>

          <h3 style={{ display: "flex", justifyContent: "center", marginBottom: '2rem', color: '#888' }}>
            Sign up here
          </h3>
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
                label="E-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your e-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="role" label="Role: " rules={[{ required: true }]}>
                <Select onChange={this.onSelectChange}>
                  <Select.Option value="customer">Customer</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
             
                  <Button
                    type="primary"
                    htmlType="submit" 
                    style={buttonStyle}
                  >
                    Sign up
                  </Button>
                
              </Form.Item>
            </Form>
          )}/>
        </Col>
      </Row>
    );
  }
}

export default Register;

const containerStyle: CSSProperties = {
    display: "flex",
    width: "60%",
    margin: "auto",
    
  };
  
  const buttonStyle: CSSProperties = {
    marginBottom: "10rem",
    float: "right",
    fontWeight: "bold",
  };
  
const register = async (email: string, password: string, role: string) => {
    try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            role: role,
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