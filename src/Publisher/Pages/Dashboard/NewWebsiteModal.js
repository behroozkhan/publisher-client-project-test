import React from 'react';
import './NewWebsiteModal.css';
import Modal from '@material-ui/core/Modal';
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { Server, WeblancerContext } from './../Contexts/WeblancerContext';

export default class NewWebsiteModal extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount(){
        this.mounted = true;
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    checkInputs = () => {
        let {newWebsite} = this.props;
        if (!newWebsite.name || newWebsite.name.length < 3) {
            this.context.showSnackbar('Website name must have at least 3 character', 'warning');
            return false;
        }
        if (newWebsite.subDomain && newWebsite.subDomain.length < 3) {
            this.context.showSnackbar('SubDomain must have at least 3 character or blank', 'warning');
            return false;
        }

        return true;
    };

    createNewWebSite = () => {
        if (!this.checkInputs())
            return;

        this.setState({loading: true, error: undefined});
        Server.createNewWebSite(this.props.newWebsite, (success, website, error) => {
            if (!this.mounted) return;

            if (success)
                this.props.onWebsiteCreated();
            else
                this.setState({error, loading: false});
        });
    };

    render () {
        let {newWebsite} = this.props;
        return (
            <Modal
                open={true}
                onClose={this.props.onClose}
                className="NewWebsiteModalRoot"
            >
                <Paper className="NewWebsiteModalPaper">
                    <span className="NewWebsiteModalTitle">
                        Create New Website
                    </span>
                    <TextField
                        className="NewWebsiteModalName"
                        label="Website Name" variant="outlined" size="small"
                        onChange={(e) => {
                            newWebsite.name = e.target.value;
                        }}
                    />
                    <TextField
                        className="NewWebsiteModalDescription"
                        label="Website Description" variant="outlined" size="small"
                        onChange={(e) => {
                            newWebsite.description = e.target.value;
                        }}
                        multiline
                        rows={2}
                    />
                    <Button
                        className="NewWebsiteModalButton"
                        variant="contained" color="primary"
                        onClick={this.createNewWebSite}
                    >
                        Create
                    </Button>
                </Paper>
            </Modal>
        )
    }
}
