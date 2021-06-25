import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import './Login.css';
import Paper from "@material-ui/core/Paper/Paper";
import Auth from "../Auth";
import config from '../../Config/config.json';
import { WeblancerContext } from './Contexts/WeblancerContext';
import ReactLoading from "react-loading";

export default class Login extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        this.state = {
            loading: false
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

        this.setState({loading: true});
        Auth.authenticate(this.username, this.password, (success, data, error) => {
            if (success) {
                this.context.showSnackbar('User logged in successfully', 'success');
                this.context.fetchUser(() => {
                    this.context.pageRedirect("/dashboard");
                });
            } else {
                this.context.showSnackbar(error, 'error');
                console.log("login error", error)
                this.setState({loading: false})
            }
        });
    };

    onRegisterClick = (e) => {
        this.context.pageRedirect("/register");
    };

    onForgetClick = () => {
        this.context.pageRedirect("/forget");
    }

    render () {
        return (
            <div className="LoginPage">
                <div className="LoginBG" >
                    <img className="LoginBGImage" src={process.env.PUBLIC_URL + "/images/login.jpg"}/>
                </div>
                <div className="LoginBoundary">
                    <img draggable={false} className="LoginWeblancerLogo"
                         src={require('../images/brand.png')} />
                    <span className="LoginTitle">
                        Login
                    </span>
                    <TextField
                        autoComplete="on"
                        className="LoginUsername"
                        label="Username" variant="outlined" size="small"
                        onChange={(e) => {
                            this.username = e.target.value;
                        }}
                    />
                    <TextField
                        autoComplete="on"
                        className="LoginPassword"
                        label="Password" variant="outlined" size="small" type="password"
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
                            Login
                        </Button>
                        <Button
                            className="LoginRegister"
                            color="primary"
                            onClick={this.onRegisterClick}
                        >
                            Register
                        </Button>
                    </div>

                    <Button
                        className="LoginForget"
                        color="primary"
                        onClick={this.onForgetClick}
                    >
                        Forget my password
                    </Button>
                </div>

                {
                    this.state.loading &&
                    <div className="NewWebsiteModalLoding">
                        <ReactLoading type={'bubbles'}
                                      color={"#7cfdf7"}
                                      height={'85px'}
                                      width={'85px'}
                        />
                    </div>
                }
            </div>
        )
    }
}
