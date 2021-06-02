import { Component, CSSProperties } from 'react'
import { Table, Space, Row, Col, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import Spinner from '../../Spinner';

interface User {
  _id: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface State {
  users: User[];
  loading: boolean;
}

class AdminRequestsList extends Component<{}, State> {

  state: State = {
    users: [],
    loading: true,
  }

  columns = [
    {
      title: 'User',
      dataIndex: "email",
      key: 'user',
    },
    {
      title: 'Admin verification',
      key: 'action',
      render: (record: User) => {
        if (!record.isVerified) {
          return(
            <Space size="middle">
              <Button onClick={() => this.handleVerifyAdmin(record._id)}>Approve as admin</Button>
            </Space>
          )
        } else {
          return (
            <Space size="middle">
                <CheckCircleFilled style={{ fontSize: '2rem', color: '#8FBC94',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}/>
            </Space>
          )
        }
      }
    }
  ];

  async componentDidMount() {
    const users = await getAdminRequests();
    this.setState({ users: users, loading: false });
  }

  handleVerifyAdmin = async (_id: string) => {
    await udateAdminVerification(_id);
    const users = await getAdminRequests();
    this.setState({ users: users });
  }
  
  render () {
    if (this.state.loading) {
      return (
          <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
              <Spinner />
          </div>
      )
    }
    if (!this.state.users) {
      return <div></div>
    }
    return (
      <Row style={userListStyle}>
        <Col span={10}>
         <h1 style={{fontWeight: 'bold'}}>ADMIN REQUESTS</h1>
         <Table columns={this.columns} dataSource={this.state.users} pagination={false} style={{ overflowX: 'auto', marginBottom: '8rem' }}/>
        </Col>
      </Row>
    )
  }
}

export default AdminRequestsList;

const userListStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '10rem',
  margin: '1rem'
}

const getAdminRequests = async () => {
  try {
    let response = await fetch('/api/users/adminrequests');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

const udateAdminVerification = async (_id: string) => {
  try {
    await fetch('/api/users/' + _id + '/isVerified', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isVerified: true })
    });
  } catch (error) {
    console.error(error);
  }
}