import { Component, CSSProperties } from "react";
import { Form, Input, Button, Col, Row, message } from "antd";
import { RouteComponentProps } from "react-router-dom";

const success = () => {
    message.success('The category has been added', 3);
};

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!'
};

interface Props extends RouteComponentProps<{ id: string }> {}

class AddCategory extends Component<Props> {

    onFinish = async (values: any) => {
        this.setState({ buttonSaveLoading: true });
        await addCategory(values);
        this.props.history.push('/admin-list');
        this.setState({ buttonSaveLoading: false });
    };

    render() {
        return(
            <div>
                <Row style={ContainerStyle}>
                    <Col span={24} style={columnStyle}>
                        <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={this.onFinish}
                        validateMessages={validateMessages}
                        >
                        <h1
                            style={{
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "bold",
                            }}
                        >
                            ADD NEW CATEGORY {" "}
                        </h1>
                            <Form.Item name={["name"]} label="Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <div
                                style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <Button 
                                        type="primary"
                                        onClick={() => {success();}}
                                        htmlType="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddCategory;

const ContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "space-around",
    width: "70%",
    marginLeft: "15%",
};
    
const columnStyle: CSSProperties = {
    paddingTop: "10rem",
    paddingBottom: "8rem",
};

const addCategory = async (category: string) => {
    try {
        await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(category)
        });
    } catch (error) {
        console.error(error);
    }
}