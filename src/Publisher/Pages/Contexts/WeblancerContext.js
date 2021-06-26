import React from 'react';
import Auth from './../../Auth';
import { withSnackbar } from 'notistack';
import ServerManager from './../../Server';

export const WeblancerContext = React.createContext({});

export let Server;

class WeblancerContextProvider extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isAuthenticated: this.isAuthenticated,
            setUser: this.setUser,
            fetchUser: this.fetchUser,
            showSnackbar: this.showSnackbar,
            dismissSnackbar: this.dismissSnackbar,
            pageRedirect: this.pageRedirect,
            setRouter: this.setRouter,
        };

        this.init();
    }

    init = () => {
        // TODO for test
        Server = new ServerManager("https://publisher.weblancer.ir/weblancer/client/api", this);
        // Server = new ServerManager('/api');
    };

    componentDidMount(){
        if (this.isAuthenticated())
            this.fetchUser();
    }

    setUser = (user, callback) => {
        this.setState({user}, callback);
    }

    fetchUser = (callback) => {
        Server.getUserData((success, data, error) => {
            if (success) {
                this.setUser(data.user);
                callback && callback();
                console.log("data.user", data.user)
            } else {
                this.showSnackbar("fetchUser error", 'error');
                console.log("fetchUser error", error)
            }
        })
    };
    
    isAuthenticated = () => {
        return Auth.isAuthenticated();
    };

    showSnackbar = (message, variant, options) => {
        return this.props.enqueueSnackbar(message, {...options, variant});
    };

    dismissSnackbar = (key) => {
        this.props.closeSnackbar(key);
    };

    setRouter = (router, callback) => {
        this.setState({router}, callback);
    }

    pageRedirect = (redirectPath, redirectProps) => {
        this.state.router.redirect(redirectPath, redirectProps);
    };

    render () {
        return (
            <WeblancerContext.Provider value={this.state}>
                {this.props.children}
            </WeblancerContext.Provider>
        )
    }
}

export default withSnackbar(WeblancerContextProvider);