import React from 'react';
import './NewWebsiteModal.css';
import Modal from '@material-ui/core/Modal';
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { Server, WeblancerContext } from './../Contexts/WeblancerContext';
import ButtonBase from "@material-ui/core/ButtonBase";
import ReactLoading from "react-loading";

export default class NewWebsiteModal extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);
        this.state = {
            loading: false,
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

        if (!newWebsite.planId) {
            this.context.showSnackbar('Select type of your website', 'warning');
            return false;
        }
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

            if (success) {
                this.props.onWebsiteCreated();
                this.context.showSnackbar("Website created successfully", "success");
            }
            else 
            {
                this.context.showSnackbar(error.response.data.message, 'warning');
                this.setState({error, loading: false});
            }
        });
    };

    selectPlanId = (planId) => {
        let {newWebsite} = this.props;
        newWebsite.planId = planId;
        this.forceUpdate();
    }

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

                    <div className="NewWebsiteModalPlansRoot">
                        <ButtonBase
                            className="NewWebsiteModalPlan"
                            onClick={() => {this.selectPlanId(1)}}
                            style={{
                                backgroundColor: newWebsite.planId === 1? "rgb(195 254 255)": undefined
                            }}
                        >
                            <img draggable={false} className="NewWebsiteModalPlanImage"
                                 src={require('../../images/landingpage.svg')} />
                            <span className="NewWebsiteModalPlanTitle">
                                Landing Page
                            </span>
                        </ButtonBase>
                        <ButtonBase
                            className="NewWebsiteModalPlan"
                            onClick={() => {this.selectPlanId(2)}}
                            style={{
                                backgroundColor: newWebsite.planId === 2? "rgb(195 254 255)": undefined
                            }}
                        >
                            <img draggable={false} className="NewWebsiteModalPlanImage"
                                 src={require('../../images/business.svg')} />
                            <span className="NewWebsiteModalPlanTitle">
                                Business
                            </span>
                        </ButtonBase>
                        <ButtonBase
                            className="NewWebsiteModalPlan"
                            onClick={() => {this.selectPlanId(3)}}
                            style={{
                                backgroundColor: newWebsite.planId === 3? "rgb(195 254 255)": undefined
                            }}
                        >
                            <img draggable={false} className="NewWebsiteModalPlanImage"
                                 src={require('../../images/store.svg')} />
                            <span className="NewWebsiteModalPlanTitle">
                                Store
                            </span>
                        </ButtonBase>
                    </div>
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
                </Paper>
            </Modal>
        )
    }
}
