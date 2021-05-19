import { Form, Input, Button, Row, Col, Divider } from "antd";
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

class Register extends Component {

  onFinish = async (values: any, history: any) => {
    const registeredUser = await register(values.username, values.email, values.password);
    if (registeredUser) {
      history.push('/registersuccess');
    } else {
      alert('User name or e-mail already exists');
    }
  };

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
                label="User Name" 
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your user name",
                  },
                ]}
              >
                <Input />
              </Form.Item>

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
  
const register = async (username: string, email: string, password: string) => {
    try {
        const response = await fetch('/api/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
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