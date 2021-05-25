import { Button, Radio, Row } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import { CartContext } from '../../contexts/CartContext';
interface Props {
  next(): void;
}

export interface DeliveryMethod {
  _id: string;
  company: string;
  deliverytime: number;
  price: number;
  deliveryDay: string;
}

interface State {
  deliveryMethods: DeliveryMethod[],
  value: string
}

class DeliverySection extends Component<Props> {
  context!: ContextType<typeof CartContext>
  static contextType = CartContext;

  state: State = {
    deliveryMethods: [],
    value: ''
  }

  async componentDidMount() {
    const deliveryMethods = await getAllDeliveryMethods();
    this.setState({
      deliveryMethods: deliveryMethods,
      value: deliveryMethods[0]?._id || '',
    });
  } 
  
  onChange = (e: any) => {
    const { setDeliveryMethod } = this.context;
    this.setState({
      value: e.target.value,
    });
    const method = this.state.deliveryMethods?.filter((item: DeliveryMethod) => item._id === e.target.value)[0];
    if (!method) {
      return;
    }
    setDeliveryMethod(method);
  };

  mapMethodToRadio() {
    if (this.state.deliveryMethods.length === 0) {
      return;
    }
    return this.state.deliveryMethods.map(item =>
      <Radio key={item._id} value={item._id} style={{ marginTop: '2rem' }}>
        <span style={deliveryCompanyStyle}>{item.company}</span>
        <br/>
        <span style={deliveryTextStyle}>{'Delivery on ' + item.deliveryDay}</span>
        <br/>
        <span style={deliveryTextStyle}>{item.price + ' kr '}</span>
      </Radio>
    );
  }

  render() {
    const { value } = this.state;
    if (this.state.deliveryMethods.length === 0) {
      return <div></div>
    }
    console.log(this.state.deliveryMethods)
    return (
      <Row style={deliveryContainer}>
          <h2>
              Delivery
          </h2>
          <Radio.Group onChange={this.onChange} value={value}>
            {this.mapMethodToRadio()}
          </Radio.Group>
          <br/>
          <Button type="primary" style={buttonStyle} onClick={this.props.next}>
            Next
          </Button>
      </Row>
    );
  }
}

export default DeliverySection;

const deliveryContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  margin: 'auto',
  paddingTop: '3rem',
  paddingBottom: '3rem'
}

const buttonStyle: CSSProperties = {
  marginTop: '3rem',
  width: '4rem'
}

const deliveryTextStyle: CSSProperties = {
  marginTop: '1rem',
  marginRight: '4rem',
  color: '#666666',
}

const deliveryCompanyStyle: CSSProperties = {
  fontWeight: 'bold',
}


const getAllDeliveryMethods = async () => {
  try {
      let response = await fetch('/api/delivery');
      if (response.ok) {
          const data = await response.json();
          return data;
      }
  } catch (error) {
      console.error(error);
  }
}