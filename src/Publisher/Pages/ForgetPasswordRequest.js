import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import './Login.css';
import {Server,  WeblancerContext } from './Contexts/WeblancerContext';
import ReactLoading from "react-loading";

export default class ForgetPasswordRequest extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    checkInputs = () => {
        if (!this.email || this.email.length < 3) {
            this.context.showSnackbar('Username must have at least 3 character', 'warning');
            return false;
        }

        return true;
    };

    onForgetClick = (e) => {
        if (!this.checkInputs())
            return;

        this.setState({loading: true});
        Server.changepasswordrequest({
            email: this.email
        }, (success, data, error) => {
            if (success) {
                this.context.showSnackbar('Recovery Email Sent', 'success');
                this.setState({loading: false})
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

    onLoginClick = (e) => {
        this.context.pageRedirect("/login");
    };

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
                        Password Recovery
                    </span>
                    <TextField
                        autoComplete="on"
                        className="LoginUsername"
                        label="Email" variant="outlined" size="small"
                        onChange={(e) => {
                            this.email = e.target.value;
                        }}
                    />

                    <div className="LoginButtonsContainer">
                        <Button
                            className="LoginEnter"
                            variant="contained" color="primary"
                            onClick={this.onForgetClick}
                        >
                            Send Email
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
                        onClick={this.onLoginClick}
                    >
                        Login
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
