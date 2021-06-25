import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import './Register.css';
import Paper from "@material-ui/core/Paper/Paper";
import config from '../../Config/config.json';
import { Server, WeblancerContext } from './Contexts/WeblancerContext';
import ReactLoading from "react-loading";

export default class Register extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    isEmailValidate = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    checkInputs = () => {
        if (this.password !== this.rePassword) {
            this.context.showSnackbar('Password repeat not match', 'warning');
            return false;
        }

        if (this.password.length < 3) {
            this.context.showSnackbar('password must have at least 3 character', 'warning');
            return false;
        }

        if (!this.isEmailValidate(this.email)) {
            this.context.showSnackbar('Email is not validate', 'warning');
            return false;
        }

        return true;
    };

    onRegisterClick = (e) => {
        if (!this.checkInputs())
            return;

        this.setState({loading: true});
        Server.register({
            username: this.username,
            password: this.password,
            email: this.email
        }, (success, data, error) => {
            if (success) {
                this.context.showSnackbar('User created successfully', 'success');
                this.context.pageRedirect("/login");
            } else {
                this.context.showSnackbar(error, 'error');
                this.setState({loading: false})
            }
        });
    };

    onLoginClick = (e) => {
        this.context.pageRedirect("/login");
    };

    render () {
        return (
            <div className="RegisterPage">
                <div className="LoginBG" >
                    <img className="LoginBGImage" src={process.env.PUBLIC_URL + "/images/login.jpg"}/>
                </div>
                <div className="RegisterBoundary">
                    <img draggable={false} className="LoginWeblancerLogo"
                         src={require('../images/brand.png')} />
                    <span className="RegisterTitle">
                        Register
                    </span>
                    <TextField
                        autoComplete="off"
                        className="RegisterUsername"
                        label="Username" variant="outlined" size="small"
                        onChange={(e) => {
                            this.username = e.target.value;
                        }}
                    />
                    <TextField
                        autoComplete="off"
                        className="RegisterUsername"
                        label="Email" variant="outlined" size="small"
                        onChange={(e) => {
                            this.email = e.target.value;
                        }}
                    />
                    <TextField
                        type="password"
                        autoComplete="off"
                        className="RegisterPassword"
                        label="Password" variant="outlined" size="small"
                        onChange={(e) => {
                            this.password = e.target.value;
                        }}
                    />
                    <TextField
                        type="password"
                        autoComplete="off"
                        className="RegisterPassword"
                        label="Retype Password" variant="outlined" size="small"
                        onChange={(e) => {
                            this.rePassword = e.target.value;
                        }}
                    />

                    <div className="RegisterButtonsContainer">
                        <Button
                            className="RegisterEnter"
                            variant="contained" color="primary"
                            onClick={this.onRegisterClick}
                        >
                            Register
                        </Button>
                        <Button
                            className="RegisterLogin"
                            color="primary"
                            onClick={this.onLoginClick}
                        >
                            Login
                        </Button>
                    </div>
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
