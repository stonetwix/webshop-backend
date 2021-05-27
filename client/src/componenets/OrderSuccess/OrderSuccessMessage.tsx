import { Result, Button, Row, Col } from 'antd';
import { Component, CSSProperties } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Reciept from '../OrderSuccess/Reciept';

interface Props extends RouteComponentProps<{ _id: string }> {}
class OrderSuccessMessage extends Component<Props> {
    render() {
        return (
            <Row style={containerStyle}>
                <Col span={24} style={colStyle}>
                    <Result
                        status="success"
                        title="You successfully purchased from FashionStore"
                        subTitle={'Your order number is: ' + this.props.location.pathname.split('/')[2]}
                        extra={[
                        <Link to='/'>
                            <Button type="primary" key="console">Continue shopping</Button>
                        </Link>
                        ]}
                    />
                    <Reciept />
                </Col>
            </Row>
        ) 
    }
}

//Math.floor(Math.random() * 1000000000000)

export default OrderSuccessMessage; 

const containerStyle: CSSProperties = {
    margin: 'auto'
}

const colStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10rem',
    marginBottom: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
}