import { Component, createContext } from 'react';


interface State {
    email: string;
    isLoggedIn: boolean;
    isAdmin: boolean; 
}

interface ContextValue extends State {
    setUser: (email: string, isAdmin: boolean) => void; 
    logoutUser: () => void; 
}

export const UserContext = createContext<ContextValue>({
    email: '', 
    isAdmin: false,
    isLoggedIn: false,
    setUser: () => {},
    logoutUser: () => {},
}); 

class UserProvider extends Component <{}, State> {

  state: State = {
        email: '', 
        isAdmin: false,
        isLoggedIn: false,
    }
  
    componentDidMount = async () => {
        const user = await whoami();
        console.log('User from Context: ', user)
        if (user && !user.error) {
            this.setUser( user.isLoggedIn);
        }
    }
 // Vad blir rollen? 
    setUser = (email: string) => {
        this.setState({ email: email, isLoggedIn: true });
        console.log('IsLoggedIn? ', this.state.isLoggedIn);
    }
    
    logoutUser = () => {
        this.setState({ email: '', isLoggedIn: false });
    }

    render() {
        return (
            <UserContext.Provider value={{
                email: this.state.email,
                isAdmin: this.state.isAdmin,
                isLoggedIn: this.state.isLoggedIn,
                setUser: this.setUser,
                logoutUser: this.logoutUser,
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;    


const whoami = async () => {
    try {
        let response = await fetch('/api/whoami');
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}