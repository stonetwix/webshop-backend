import { Component, ContextType, CSSProperties } from 'react';
import { Card, Col, List, Row, message, Select } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

const { Meta } = Card;
const { Option } = Select;

const success = () => {
    message.success('The product was added to the cart', 5);
};

const children: any = [];
for (let i = 10; i < 36; i++) {
    children.push(
        <Option value={i.toString(36) + i} key={i.toString(36) + i}>
        {i.toString(36) + i}
        </Option>
    )
}
export interface Product {
    _id: string
    title: string
    description: string
    price: number
    imageUrl: string
}

interface State {
    products?: Product[],
}
class ProductCardGrid extends Component<State> {
    context!: ContextType<typeof CartContext>
    static contextType = CartContext;

    state: State = {
        products: [],
    }

    async componentDidMount() {
        const products = await getProducts();
        this.setState({ products: products });
    }

    handleChange(value: any) {
        console.log(`selected ${value}`);
    }
        
    render() {
        const { addProductToCart } = this.context;
        return(
            <>
                <Row style={selectContainer}>
                    <Col span={24}>
                        <h3>Filter products</h3>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={['all']}
                            onChange={this.handleChange}
                            >
                            {children}
                        </Select>
                    </Col>
                </Row> 
                <Row style={cardContainer}>
                    <Col span={24} style={columnStyle}>
                        <List
                            grid={{
                                gutter: 25,
                                xs: 1,
                                sm: 2,
                                md: 2,
                                lg: 4,
                                xl: 4,
                                xxl: 4,
                            }}
                            dataSource={this.state.products}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={'/product/' + item._id}>
                                        <Card
                                            hoverable
                                            cover={<img src={item.imageUrl} alt='product' />}
                                            actions={[
                                                <ShoppingCartOutlined 
                                                    style={{ fontSize: '2rem' }}
                                                    onClick={(e) => {success(); e.preventDefault(); addProductToCart(item, undefined)}} 
                                                />
                                            ]}
                                        >
                                        <Meta title={item.title} description={item.price + ' kr'} />
                                        </Card>
                                    </Link>
                                </List.Item>
                            )}    
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

export default ProductCardGrid;

const cardContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    margin: 'auto',
    paddingBottom: '8rem',
}

const selectContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    margin: 'auto',
    paddingBottom: '2rem',
    paddingTop: '2rem',
}

const columnStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
}

const getProducts = async () => {
    try {
        let response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          return data;
        }
    } catch (error) {
        console.error(error);
    }
  }