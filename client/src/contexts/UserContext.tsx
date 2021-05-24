import { Component, createContext } from 'react';


interface State {
    email: string,
  
    isLoggedIn: boolean;


}

interface ContextValue extends State {
    setUser: (email: string) => void; 
    logoutUser: () => void; 
}

export const UserContext = createContext<ContextValue> ({
    email: '', 
    isLoggedIn: false,

    setUser: () => {},
    logoutUser: () => {}

}); 

class UserProvider extends Component <{}, State> {

  state: State = {
        email: '', 
        isLoggedIn: false,
    }

    componentDidMount = async () => {
        const user = await whoami();
        if (user && !user.error) {
            this.setUser( user.isLoggedIn);
        }
    }
 
    setUser = (email: string) => {
        this.setState({ isLoggedIn: true });
    }
    
    logoutUser = () => {
        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <UserContext.Provider value={{
                email: this.state.email,
                isLoggedIn: this.state.isLoggedIn,
                setUser: this.setUser,
                logoutUser: this.logoutUser,
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}


const whoami = async () => {
    try {
        let response = await fetch('/api/whoami/');
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}