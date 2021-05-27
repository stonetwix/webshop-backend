import { Result, Button, Row, Col } from 'antd';
import { Component, CSSProperties } from 'react';
import { Route } from 'react-router-dom';

class SuccessMessage extends Component {

    handleLogInClick = (history: any) => {
        history.push('/login');
    }

    render() {
        return (
            <Row style={containerStyle}>
                <Col span={24} style={colStyle}>
                    <Result
                        status="success"
                        title="You successfully registered an account on FashionStore"
                        extra={[
                            <Route render={({ history }) => (
                                <Button
                                  type="primary"
                                  key="console"
                                  onClick={() => this.handleLogInClick(history)}
                                >
                                  Log in
                                </Button>
                            )}/>
                        ]}
                    />
                </Col>
            </Row>
        ) 
    }
};

export default SuccessMessage; 

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