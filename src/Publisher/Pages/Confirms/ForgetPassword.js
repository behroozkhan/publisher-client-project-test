import React from 'react';
import './ConfirmMail.css';
import './ForgetPassword.css';
import { Server, WeblancerContext } from '../Contexts/WeblancerContext';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField/TextField";
import ReactLoading from "react-loading";

export default class ForgetPassword extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            changed: false
        };
    }

    componentDidMount(){
        this.mounted = true;
        if (!this.props.hash || !this.props.email) {
            window.requestAnimationFrame(() => {this.context.pageRedirect('/login')})
        }
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    change = () => {
        if (this.password !== this.rePassword) {
            this.context.showSnackbar('Password retype is not match', 'warning');
            return false;
        }

        if (this.password.length < 3) {
            this.context.showSnackbar('password must have at least 3 character', 'warning');
            return false;
        }

        this.setState({loading: true, error: undefined});
        Server.changePassword({
            email: this.props.email,
            newPassword: this.password,
            hash: this.props.hash
        }, (success, data, error) => {
            if (!this.mounted) return;

            if (success)
                this.setState({changed: true, loading: false});
            else
                this.setState({changed: false, error: error});
        });
    };

    render () {
        return (
            <div className="ConfirmMailRoot">
                <div className="ForgetPasswordContainer">
                {
                    !this.state.changed &&
                    <div className="ForgetPasswordData">
                        <span className="ForgetPasswordTitle">Recovering your password</span>

                        <TextField
                            autoComplete="on"
                            className="ForgetPasswordPassword"
                            label="New Password" variant="outlined" size="small" type="password"
                            onChange={(e) => {
                                this.password = e.target.value;
                            }}
                        />

                        <TextField
                            autoComplete="on"
                            className="ForgetPasswordPassword"
                            label="Retype New Password" variant="outlined" size="small" type="password"
                            onChange={(e) => {
                                this.rePassword = e.target.value;
                            }}
                        />

                        <Button className="ForgetPasswordChange"
                                onClick={(e) => {
                                    this.change();
                                }}
                                color="primary"
                        >
                            Change Password
                        </Button>
                    </div>
                }
                {
                    this.state.changed &&
                    <div className="ConfirmMailConfirmed">
                        <span className="ConfirmMailConfirmedTitle">Password changed successfully</span>
                        <span className="ConfirmMailConfirmedDesc">Now go to login page and login with new password</span>

                        <Button className="ForgetPasswordChange"
                                onClick={(e) => {
                                    this.context.pageRedirect('login');
                                }}
                                color="primary"
                        >
                            Login
                        </Button>
                    </div>
                }

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
            </div>
        )
    }
}
