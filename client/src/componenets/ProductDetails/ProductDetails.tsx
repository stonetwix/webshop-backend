import { Row, Col, message, Button } from 'antd';
import { Component, ContextType, CSSProperties } from 'react'; 
import { Image } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import ErrorPage from '../ErrorPage';
import { Product } from '../StartPage/ProductCardGrid';
import Spinner from "../../Spinner";
interface State {
    product?: Product;
    loading: boolean;
}
interface Props extends RouteComponentProps {
    _id: string
}
const success = () => {
    message.success('The product was added to the cart', 5);
};
class ProductDetails extends Component <Props, State> {
    context!: ContextType<typeof CartContext>
    static contextType = CartContext;
   
    state: State = {
        product: undefined,
        loading: true,
    }

    async componentDidMount() {   
        const product = await getProduct((this.props.match.params as any)._id);
        this.setState({ product: product, loading: false })
    }

    handleAddClick = () => {
        const { addProductToCart } = this.context;
        success();
        addProductToCart(this.state.product!, undefined)
    }

    render () {
        if (this.state.loading) {
            return (
                <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
                    <Spinner />
                </div>
            )
        }
        if (!this.state.product) {
            return <ErrorPage />
        }
       
        return (
            <Row style={detailContainer}>
                <Col lg={{span: 10}} style={columnStyle}>
                    <Image src={this.state.product.imageUrl} />          
                </Col>

                <Col lg={{span: 10}} style={columnStyle}>
                    <h2 style={titleStyle}>{this.state.product.title}</h2>
                    <h4>{this.state.product.description}</h4>
                    <h2 style={price}>{this.state.product.price + ' kr'}</h2>
                    <h3 style={{ color: 'red' }}>{this.state.product.inventory === 1 ? 'Only 1 left!' : ''}</h3>
                    <Button 
                        type="primary" 
                        style={{ marginTop: '1rem', width: '8rem', marginBottom: '6rem' }} 
                        onClick={this.handleAddClick}
                        >
                        Add to cart 
                    </Button>
                </Col>
            </Row>
        ); 
    }    
}

export default withRouter(ProductDetails as any); 

const detailContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    margin: 'auto',
}

const columnStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10rem',
    marginBottom: '5rem',
}

const titleStyle: CSSProperties = {
   fontSize: '2rem'
}

const price: CSSProperties = {
    fontWeight: 'bold'
}

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