import { PlusCircleOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, List, Row, message } from "antd";
import { Component, CSSProperties } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner";
import { Product } from "../StartPage/ProductCardGrid";

interface State {
    products?: Product[]; 
    loading: boolean;
}

const successDelete = () => {
    message.success('The product has been deleted', 3);
};
class AdminList extends Component < {}, State>{

    state: State = {
        products: [],
        loading: true,
    }

    async componentDidMount() {
        const products = await getProducts();
        this.setState({ products: products, loading: false });
    }

    handleDelete = async (_id: string) => {
        await deleteProduct(_id);
        const products = await getProducts();
        this.setState({ products: products });
    }

    render() {
        if (this.state.loading) {
            return (
                <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
                    <Spinner />
                </div>
            )
        }
        return (
            <Row style={containerStyle}>
                <Col style={columnStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4rem', marginBottom: '4rem' }}>
                        <h1 style={{fontWeight: 'bold'}}>ADMIN PRODUCTS</h1>                  
                        <Link to ={'/admin-add-product'}> 
                            <Button type="primary" icon={<PlusCircleOutlined />}>
                                Add product
                            </Button>
                        </Link> 
                        <Link to ={'/admin-add-category'}> 
                            <Button type="primary" icon={<PlusCircleOutlined />} style={{ marginTop: '1rem' }}>
                                Add category
                            </Button>
                        </Link>
                        
                    </div>    

                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.products}
                        renderItem={item => (
                        <List.Item actions={[
                            <Link to={'/edit-product/' + item._id}>  
                                <Button 
                                key="edit-product" 
                                style={editStyle}
                                icon={<FormOutlined />}
                                >
                                    edit
                                </Button>
                            </Link>, 
                            <Button 
                                key="delete-product" 
                                onClick={() => {this.handleDelete(item._id); successDelete();}}                                 
                                style={deleteStyle}
                                icon={<DeleteOutlined />}
                            >
                                delete
                            </Button>]}
                        >
                        <List.Item.Meta
                            avatar={<Avatar src={item.imageUrl} style={{ width: '4rem', height: '4rem' }}/>}
                            title={item.title}
                            description={item.description.substring(0, 35) + '...'}
                        />
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

const deleteStyle: CSSProperties = {
    color: 'red',
    backgroundColor: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1.2rem',
    marginLeft: '1rem',
    boxShadow: 'none'
}

const editStyle: CSSProperties = {
    backgroundColor: 'white',
    color: '#78757C',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1.2rem',
    marginRight: '1rem',
    boxShadow: 'none'
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

const deleteProduct = async (_id: string) => {
    try {
        await fetch('/api/products/' + _id, {
          method: 'DELETE',
        });
    } catch (error) {
        console.error(error);
    }
}