import React from "react";
import Auth from "./Auth";
import {Redirect, Route} from "react-router-dom";
import { WeblancerContext } from './Pages/Contexts/WeblancerContext';

export default function PrivateRoute({ children, ...rest }) {
    return (
        <WeblancerContext.Consumer>
            {weblancerContext => (
            <Route
                {...rest}
                render={({ location }) =>
                    {
                        return (weblancerContext.isAuthenticated() ? (
                                children
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: "/login",
                                        state: { from: location }
                                    }}
                                />
                            )
                        )
                    }
                }
            />
            )}
        </WeblancerContext.Consumer>
    );
}
