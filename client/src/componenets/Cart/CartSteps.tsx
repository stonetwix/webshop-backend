import { Row, Steps } from 'antd';
import { Component, CSSProperties } from 'react';
import DeliverySelection from './DeliverySelection';
import InformationForm from './InformationForm';
import PaymentMethod from './PaymentMethod';
import CompleteOrder from './CompleteOrder';


const { Step } = Steps;

const steps = [
  {
    title: 'Your information',
  },
  {
    title: 'Delivery',
  },
  {
    title: 'Payment',
  },
  {
    title: 'Complete order',
  },
];

interface State {
    current: number;
}
class CartSteps extends Component<{}, State> { 

    state: State = {
        current: 0
    }

    next = () => {
        this.setState({ current: this.state.current + 1});
    }

    prev = () => {
        this.setState({ current: this.state.current - 1});
    }

    render() {
        const { current } = this.state;
        const stepsComponents: any = {
            0: InformationForm,
            1: DeliverySelection,
            2: PaymentMethod,
            3: CompleteOrder,
        };
        const StepsComponent = stepsComponents[current];

        return(
          <Row style={cartViewContainerStyle}>
            <Steps current={this.state.current} style={{ marginTop: '7rem' }}>
                {steps.map(item => (
                <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <StepsComponent next={this.next} />
          </Row>
        )
    }}


export default CartSteps;

const cartViewContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    margin: 'auto',
    paddingBottom: "8rem",
}