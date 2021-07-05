import React from "react";
import {
    Switch,
    Route, Redirect
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import EditorHolder from "./Pages/EditorHolder/EditorHolder";
import { WeblancerContext } from './Pages/Contexts/WeblancerContext';
import qs from 'qs';
import ConfirmMail from './Pages/Confirms/ConfirmMail';
import ForgetPassword from "./Pages/Confirms/ForgetPassword";
import ForgetPasswordRequest from "./Pages/ForgetPasswordRequest";

class MainRouter extends React.Component {
    static contextType = WeblancerContext;

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount(){
        this.context.setRouter(this);
    }

    removeQuery = () => {
        var newurl = window.location.protocol 
        + "//" + window.location.host + window.location.pathname;
        window.history.pushState({path:newurl},'',newurl);
    }

    redirect = (redirectPath, redirectProps) => {
        this.removeQuery();
        this.redirectPath = redirectPath;
        console.log("redirect", redirectPath, redirectProps)
        this.setState({reload: true, redirectProps});
    };

    getRedirectProps = () => {
        let {redirectProps} = this.state;
        let queryString = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        redirectProps = Object.assign(queryString || {}, redirectProps || {});

        return redirectProps;
    }

    render () {
        if (this.redirectPath) {
            let redirectPath = this.redirectPath;
            delete this.redirectPath;
            return <Redirect to={{
                    pathname: redirectPath,
                    state: { from: this.props.location.pathname }
                }}
            />
        }

        return (
            <Switch>
                <Route path="/login">
                    <Login {...this.getRedirectProps()}/>
                </Route>

                <Route path="/register">
                    <Register {...this.getRedirectProps()}/>
                </Route>

                <Route path="/mailconfirm">
                    <ConfirmMail {...this.getRedirectProps()}/>
                </Route>

                <Route path="/forget">
                    <ForgetPasswordRequest {...this.getRedirectProps()}/>
                </Route>

                <Route path="/recovery">
                    <ForgetPassword {...this.getRedirectProps()}/>
                </Route>

                <PrivateRoute path="/dashboard">
                    <Dashboard {...this.getRedirectProps()}/>
                </PrivateRoute>

                {/* <PrivateRoute path="/holder/:id"> */}
                <PrivateRoute path="/holder">
                    <EditorHolder  {...this.getRedirectProps()}/>
                </PrivateRoute>

                <PrivateRoute path="/">
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: { from: "/" }
                        }}
                    />
                </PrivateRoute>
            </Switch>
        )
    }
}

export default MainRouter;
