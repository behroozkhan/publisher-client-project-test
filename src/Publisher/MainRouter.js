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

    redirect = (redirectPath, redirectProps) => {
        this.redirectPath = redirectPath;
        this.setState({reload: true, redirectProps});
    };

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
                        <Login {...this.state.redirectProps}/>
                    </Route>

                    <Route path="/register">
                        <Register {...this.state.redirectProps}/>
                    </Route>

                    <PrivateRoute path="/dashboard">
                        <Dashboard {...this.state.redirectProps}/>
                    </PrivateRoute>

                    <PrivateRoute path="/holder/:id">
                        <EditorHolder/>
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
