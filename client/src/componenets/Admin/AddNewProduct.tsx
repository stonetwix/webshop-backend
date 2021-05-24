import { Component, CSSProperties } from "react";
import { Form, Input, Button, Col, Row, message, Select, InputNumber } from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Category, Product } from "../StartPage/ProductCardGrid";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

interface Props extends RouteComponentProps<{ id: string }> {}
interface State {
  product: Product | undefined;
  categories?: Category[]; 
  buttonSaveLoading: boolean;
}

const success = () => {
  message.success('The product has been published', 3);
};
class AddNewProduct extends Component<Props, State> {
  
  state: State = {
    product: undefined,
    categories: [],
    buttonSaveLoading: false,
  };
  
  onFinish = async (values: any) => {
    this.setState({ buttonSaveLoading: true });
    await addProduct(values.product);
    this.props.history.push('/admin-list');
    this.setState({ buttonSaveLoading: false });
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories: categories });
  }

  categoryOptions = () => {
    return this.state.categories?.map((c: Category) => {
        return <Option value={c._id} key={c.name}>
            {c.name}
        </Option>
    })
  }

  componentWillUnmount() {
    this.setState({ product: undefined });
  };

  render() {
    return (
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
                ADD NEW PRODUCT {" "}
              </h1>
              <Form.Item name={["product", "title"]} label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={["product", "description"]} label="Description" rules={[{ required: true }]}>
                <Input.TextArea />
              </Form.Item>

              <Form.Item name={["product", "price"]} label="Price" rules={[{ required: true }]}>
                <InputNumber />
              </Form.Item>
              
              <Form.Item name={["product", "imageUrl"]} label="ImageUrl" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={["product", "categories"]} label="Categories" rules={[{ required: true }]}>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  >
                  {this.categoryOptions()}
                </Select>
              </Form.Item>
              <Form.Item name={["product", "inventory"]} label="Inventory" rules={[{ required: true }]}>
                <InputNumber />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button 
                    type="primary"
                    onClick={() => {success();}}
                    htmlType="submit"
                    loading={this.state.buttonSaveLoading}
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

export default withRouter(AddNewProduct); 

const addProduct = async (product: Product) => {
  try {
      await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      });
  } catch (error) {
      console.error(error);
  }
}

const getCategories = async () => {
  try {
      let response = await fetch('/api/categories');
      if (response.ok) {
          const data = await response.json();
          return data;
      }
  } catch (error) {
      console.error(error);
  }
} 