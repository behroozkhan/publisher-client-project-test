import React from 'react';
import './ConfirmMail.css';
import { Server, WeblancerContext } from './../Contexts/WeblancerContext';

export default class ConfirmMail extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        this.state = {
            loading: true,
            confirmed: false
        };

        console.log("ConfirmMail constructor", props.hash)
    }

    componentDidMount(){
        this.mounted = true;
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
            {
                this.state.loading && "Checking ..."
            }
            {
                !this.state.loading && this.state.confirmed && "Confirmed"
            }
            </div>
        )
    }
}
