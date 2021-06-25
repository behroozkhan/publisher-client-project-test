import React from 'react';
import './ConfirmMail.css';
import { Server, WeblancerContext } from './../Contexts/WeblancerContext';
import Button from '@material-ui/core/Button';

export default class ConfirmMail extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        this.state = {
            loading: true,
            confirmed: false
        };
    }

    componentDidMount(){
        this.mounted = true;
        if (!this.props.hash) {
            window.requestAnimationFrame(() => {this.context.pageRedirect('/login')})
        }
        this.load();
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    load = () => {
        this.setState({loading: true, error: undefined});
        Server.confirmMail(this.props.hash, (success, data, error) => {
            if (!this.mounted) return;

            if (success)
                this.setState({confirmed: true, loading: false});
            else
                this.context.pageRedirect(`/login`);
        });
    };

    render () {
        return (
            <div className="ConfirmMailRoot">
                <div className="ConfirmMailContainer">
                {
                    this.state.loading &&
                    <div className="ConfirmMailChecking">
                        <span>Checking verification link ...</span>
                    </div>
                }
                {
                    !this.state.loading && this.state.confirmed &&
                    <div className="ConfirmMailConfirmed">
                        <span className="ConfirmMailConfirmedTitle">Thank you for verifying your email address</span>
                        <span className="ConfirmMailConfirmedDesc">Email address verfied successfully</span>

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
                </div>
            </div>
        )
    }
}
