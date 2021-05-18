import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, List, Row, } from "antd";
import { Component, CSSProperties } from "react";
import { Link } from "react-router-dom";

export interface Product {
    id: number
    title: string
    description: string
    price: number
    imageUrl: string
}

interface State {
    products?: Product[]; 
}
class AdminList extends Component < {}, State>{

    state: State = {
        products: []
    }

    async componentDidMount() {
        const products = await getProducts();
        this.setState({ products: products });
    }

    render() {
        return (
            <Row style={containerStyle}>
                <Col style={columnStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between',
                        alignItems:'center', marginTop: '2rem', marginBottom: '3rem' }}>
                        <h1 style={{fontWeight: 'bold'}}>ADMIN</h1>                  
                        <Link to ={'/add-product'}> 
                            <Button type="primary" icon={<PlusOutlined />}>
                                Add product
                            </Button>
                        </Link> 
                    </div>    

                    <List grid={{
                        gutter: 12,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                        xxl: 1,
                        }}
                        dataSource={this.state.products}
                        renderItem={item => (
                            <List.Item>
                                <Link to={'/product/' + item.id}>     
                                <List.Item.Meta                    
                                    avatar={<Avatar size={64} src={item.imageUrl} />} 
                                    title={item.title}
                                    description={[item.description.split('.')[0],  
                                    ]}
                                />  
                                </Link>
                                <Link to={'/edit-product/' + item.id}>
                                    <p style={editStyle}>edit</p>
                                </Link>
                            </List.Item>
                        )}
                    /> 
                </Col>
            </Row> 
        )
    }
}

const containerStyle: CSSProperties = {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '8rem',
}

const columnStyle: CSSProperties = {
   margin: '5rem 0 0 0',
   width: '80%'
}

const editStyle: CSSProperties = {
    color: 'red', 
    display: 'flex', 
    justifyContent: 'flex-end',
    borderBottom: '1px solid lightgrey',
    alignItems: 'center'
}

export default AdminList;

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