import { Form, Input, Button, Col, Row, message, Select, InputNumber } from "antd";
import { Component, CSSProperties } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
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
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

interface Props extends RouteComponentProps<{ id: string }> {}

interface State {
  product?: Product;
  categories?: Category[];
  buttonSaveLoading: boolean;
  buttonDeleteLoading: boolean;
}

const successSave = () => {
  message.success('The product has been updated', 3);
};

const successDelete = () => {
  message.success('The product has been deleted', 3);
};

class AdminEditDetails extends Component<Props, State> {
  state: State = {
    product: undefined,
    categories: [],
    buttonSaveLoading: false,
    buttonDeleteLoading: false,
  };

  onFinish = async (values: any) => {
    this.setState({ buttonSaveLoading: true });
    await putProduct(values.product, (this.props.match.params as any)._id);
    this.props.history.push('/admin-list');
    this.setState({ buttonSaveLoading: false });
  }

  async componentDidMount() {
    const product = await getProduct((this.props.match.params as any)._id);
    const categories = await getCategories();
    this.setState({ product: product, categories: categories });
  }

  categoryOptions = () => {
    return this.state.categories?.map((c: Category) => {
        return <Option value={c._id} key={c.name}>
            {c.name}
        </Option>
    })
}

handleChange = async (value: any) => {
  console.log(value);
  //const products = await getCategories(value);
  //this.setState({ products: products });
}

  componentWillUnmount() {
    this.setState({ product: undefined });
  }

  render() {
    const { product } = this.state;

    if (!product) {
      return <ErrorPage />
    }

    return (
      <div>
        <Row style={ContainerStyle}>
          <Col span={24} style={columnStyle}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
              initialValues={{
                product: {
                  title: this.state.product?.title,
                  description: this.state.product?.description,
                  price: this.state.product?.price,
                  imageUrl: this.state.product?.imageUrl,
                }
              }}
            >
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                EDIT PRODUCT
              </h1>
              <Form.Item name={["product", "title"]} label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={["product", "description"]} label="Description" rules={[{ required: true }]}>
                <Input.TextArea/>
              </Form.Item>

              <Form.Item name={["product", "price"]} label="Price" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              
              <Form.Item name={["product", "imageUrl"]} label="ImageUrl" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={["product", "categories"]} label="Categories" rules={[{ required: true }]}>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  defaultValue={[]}
                  //onChange={this.handleChange}
                  >
                  {this.categoryOptions()}
                </Select>
              </Form.Item>
              <Form.Item name={["product", "inStock"]} label="In Stock" rules={[{ required: true }]}>
                <InputNumber />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button 
                    type="primary"
                    onClick={() => {successSave();}} 
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
    );
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

export default withRouter(AdminEditDetails);


const getProduct = async (_id: string) => {
  try {
    let response = await fetch('/api/products/' + _id);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
      console.error(error);
  }
}

const putProduct = async (product: Product, _id: string) => {
  try {
      await fetch('/api/products/' + _id, {
        method: 'PUT',
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