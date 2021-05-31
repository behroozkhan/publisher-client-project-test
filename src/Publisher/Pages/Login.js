import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import './Login.css';
import Paper from "@material-ui/core/Paper/Paper";
import Auth from "../Auth";
import config from '../../Config/config.json';
import { WeblancerContext } from './Contexts/WeblancerContext';

export default class Login extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        this.state = {

        };
    }

    checkInputs = () => {
        if (!this.username || this.username.length < 3) {
            this.context.showSnackbar('Username must have at least 3 character', 'warning');
            return false;
        }

        if (!this.password || this.password.length < 3) {
            this.context.showSnackbar('Password must have at least 3 character', 'warning');
            return false;
        }

        return true;
    };

    onLoginClick = (e) => {
        if (!this.checkInputs())
            return;

        Auth.authenticate(this.username, this.password, (success, data, error) => {
            if (success) {
                this.context.showSnackbar('User logged in successfully', 'success');
                this.context.fetchUser(() => {
                    this.context.pageRedirect("/dashboard");
                });
            } else {
                this.context.showSnackbar(error, 'error');
                console.log("login error", error)
            }
        });
    };

    onRegisterClick = (e) => {
        this.context.pageRedirect("/register");
    };

    render () {
        return (
            <div className="LoginPage">
                <Paper className="LoginBoundary">
                    <span className="LoginTitle">
                        {config.BrandName} Website Builder
                    </span>
                    <TextField
                        className="LoginUsername"
                        label="Username" variant="outlined" size="small"
                        onChange={(e) => {
                            this.username = e.target.value;
                        }}
                    />
                    <TextField
                        className="LoginPassword"
                        label="Password" variant="outlined" size="small"
                        onChange={(e) => {
                            this.password = e.target.value;
                        }}
                    />

                    <div className="LoginButtonsContainer">
                        <Button
                            className="LoginEnter"
                            variant="contained" color="primary"
                            onClick={this.onLoginClick}
                        >
                            Enter
                        </Button>
                        <Button
                            className="LoginRegister"
                            color="primary"
                            onClick={this.onRegisterClick}
                        >
                            Register
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}
