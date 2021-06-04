import { Form, Input, Button, Col, Row, message, Select, InputNumber, FormInstance, Upload } from "antd";
import React, { Component, CSSProperties, Ref } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { Category, Product } from "../StartPage/ProductCardGrid";
import { UploadOutlined } from '@ant-design/icons';
import Spinner from "../../Spinner";

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
  imgUrl: string;
  loading: boolean;
}

const successSave = () => {
  message.success('The product has been updated', 3);
};

class AdminEditDetails extends Component<Props, State> {
  formRef = React.createRef();
  
  state: State = {
    product: undefined,
    categories: [],
    buttonSaveLoading: false,
    buttonDeleteLoading: false,
    imgUrl: '',
    loading: true,
  };

  uploadProps = {
    name: 'photo',
    action: '/api/upload',
    onChange: (info: any) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        (this.formRef as any).current.setFieldsValue({
          // eslint-disable-next-line no-useless-computed-key
          ['imageUrl']: info.file.response.path,
        })
        this.setState({ imgUrl: 'test' })
        
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  onFinish = async (values: any) => {
    console.log(values)
    this.setState({ buttonSaveLoading: true });
    await putProduct(values, (this.props.match.params as any)._id);
    this.props.history.push('/admin-list');
    this.setState({ buttonSaveLoading: false });
  }

  async componentDidMount() {
    const product = await getProduct((this.props.match.params as any)._id);
    const categories = await getCategories();
    this.setState({ product: product, categories: categories, loading: false });
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
  }

  render() {
    const { product } = this.state;
    if (this.state.loading) {
      return (
          <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
              <Spinner />
          </div>
      )
    }
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
                  title: this.state.product?.title,
                  description: this.state.product?.description,
                  price: this.state.product?.price,
                  imageUrl: this.state.product?.imageUrl,
                  categories: this.state.product?.categories,
                  inventory: this.state.product?.inventory,
              }}
              ref={(this.formRef as Ref<FormInstance<any>>)}
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
              <Form.Item name={["title"]} label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={["description"]} label="Description" rules={[{ required: true }]}>
                <Input.TextArea/>
              </Form.Item>

              <Form.Item name={["price"]} label="Price" rules={[{ required: true }]}>
                <InputNumber min={1} />
              </Form.Item>

              <Form.Item name={["imageUpload"]} label="Image Upload">
                <Upload {...this.uploadProps} >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              
              <Form.Item name={["imageUrl"]} label="ImageUrl" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={["categories"]} label="Categories" rules={[{ required: true }]}>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  >
                  {this.categoryOptions()}
                </Select>
              </Form.Item>
              <Form.Item name={["inventory"]} label="Inventory" rules={[{ required: true }]}>
                <InputNumber min={0}/>
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