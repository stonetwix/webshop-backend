import { Button, Radio, Row } from 'antd';
import { Component, ContextType, CSSProperties } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { calculateDeliveryDay } from '../deliveryMethods';
interface Props {
  next(): void;
}

export interface DeliveryMethod {
  id: number;
  company: string;
  time: number;
  price: number;
}

interface State {
  deliveryMethods?: DeliveryMethod[],
  value: number
}

class DeliverySection extends Component<Props> {
  context!: ContextType<typeof CartContext>
  static contextType = CartContext;

  state: State = {
    deliveryMethods: [],
    value: 1
  }

  async componentDidMount() {
    const deliveryMethods = await getAllDeliveryMethods();
    this.setState({ deliveryMethods: deliveryMethods });
  } 
  
  onChange = (e: any) => {
    const { setDeliveryMethod } = this.context;
    this.setState({
      value: e.target.value,
    });
    const method = this.state.deliveryMethods?.filter((item: DeliveryMethod) => item.id === e.target.value)[0];
    setDeliveryMethod(method);
  };

  mapMethodToRadio() {
    return this.state.deliveryMethods?.map(item =>
      <Radio value={item.id} style={{ marginTop: '2rem' }}>
        <span style={deliveryCompanyStyle}>{item.company}</span>
        <br/>
        <span style={deliveryTextStyle}>{'Delivery on ' + calculateDeliveryDay(item.time)}</span>
        <br/>
        <span style={deliveryTextStyle}>{item.price + ' kr '}</span>
      </Radio>
    );
  }

  render() {
    const { value } = this.state;

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