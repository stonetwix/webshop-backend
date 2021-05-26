import React, { Component } from 'react';
import AdminLogIn from './AdminLogIn';
import AdminRegister from './AdminRegister';



class LoginView extends Component {
    render() {
        return(
            <div>
                <AdminLogIn />
                <AdminRegister />
            </div>
        )
    }
}

export default LoginView;