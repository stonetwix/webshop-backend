import { Component } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 30, color: 'black', marginTop: '15rem' }} spin />;

class Spinner extends Component {

    render() {
        return (
            <Spin indicator={antIcon} />
        )
    }
}

export default Spinner;