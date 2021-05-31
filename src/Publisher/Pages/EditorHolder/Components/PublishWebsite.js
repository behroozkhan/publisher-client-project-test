import React from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { Server } from './../../Contexts/WeblancerContext';
import { WeblancerContext } from './../../Contexts/WeblancerContext';
import './PublishWebsite.css';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default class PublishWebsite extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        this.state = {
            status: 'loading'
        }
    }

    componentDidMount(){
        this.mounted = true;
        this.load();
    }

    componentWillUnmount(){
        this.mounted = false;
        clearInterval(this.loadingInterval);
    }

    load = () => {
        this.setState({status: 'loading'});

        let {websiteId} = this.props;

        Server.publishProcess(websiteId, (success, data, error) => {
            if (!this.mounted)
                return;

            if (success) {
                if (data.longProcessId) {
                    this.fetchLongProcessAsync(data.longProcessId);
                    return;
                }
            } else {
                this.context.showSnackbar("Error on getting old publish process", 'warning');
            }

            Server.publishRequest(websiteId, (success, data, error) => {
                if (!this.mounted)
                    return;
                
                if (success) {
                    if (data.longProcessId) {
                        this.fetchLongProcessAsync(data.longProcessId);
                        return;
                    }
                } else {
                    this.setState({status: 'error', error: "Error on publishing"});
                    this.context.showSnackbar("Error on publishing", 'error');
                }
            });
        });
    };

    fetchLongProcessAsync = (longProcessId) => {
        this.setState({status: 'publishing'});
        let time = 0;
        this.fetchLongProcess(longProcessId);
        this.loadingInterval = setInterval(() => {
            time += 3;
            this.fetchLongProcess(longProcessId);
        }, 3000);
    };

    fetchLongProcess = (longProcessId) => {
        Server.getLongProcess(longProcessId, (success, data, error) => {
            if (!this.mounted)
                return;
                
            if (success) {
                if (data.longProcess.state === 'complete') {
                    clearInterval(this.loadingInterval);
                    console.log("Publishing Complete: ", data);
                    this.setState({status: 'complete', publishUrl: data.longProcess.metaData.url});
                    this.context.showSnackbar("Publishing Completed Successfully", 'success');
                } else if (data.longProcess.state === 'complete') {
                    clearInterval(this.loadingInterval);
                    this.setState({status: 'error', error: "Error on publishing"});
                    this.context.showSnackbar("Error on publishing", 'error');
                }
            } else {
                this.context.showSnackbar("Error on fetchLongProcess", 'warning');
            }
        })
    };

    render () {
        return (
            <Modal
                open={true}
                onClose={
                    (this.state.status === 'complete' ||this.state.status === 'error') ?
                        this.props.onClose : undefined}
                className="PublishWebsiteRoot"
            >
                <Paper
                    className="PublishWebsitePaper"
                >
                    {
                        (this.state.status === 'loading' || this.state.status === 'publishing') &&
                        <div className="PublishWebsiteHeader">
                            <span className="PublishWebsiteTitle">Building Website</span>
                            <span className="PublishWebsiteSubTitle">We are creating an optimize version of your website</span>
                        </div>
                    }

                    {
                        this.state.status === 'complete' &&
                        <>
                            <div className="PublishWebsiteHeader">
                                <span className="PublishWebsiteTitle">Congratulations</span>
                                <span className="PublishWebsiteSubTitle">Your site is published and live online</span>
                            </div>

                            <div className="PublishWebsiteExit">
                                <IconButton onClick={this.props.onClose}>
                                    <Close />
                                </IconButton>
                            </div>
                        </>
                    }

                    {
                        this.state.status === 'error' &&
                        <>
                            <div className="PublishWebsiteHeader">
                                <span className="PublishWebsiteTitle">Error Found</span>
                                <span className="PublishWebsiteSubTitle">We could not publish your website due to an error, please call supports for more help</span>
                            </div>
                            <span className="PublishWebsiteCallSupport">
                                Contact: 09390177883
                            </span>

                            <div className="PublishWebsiteExit">
                                <IconButton onClick={this.props.onClose}>
                                    <Close />
                                </IconButton>
                            </div>
                        </>
                    }
                    
                    {
                        this.state.status === 'complete' &&
                        <>
                            <div className="PublishWebsiteData">
                                <div className="PublishWebsiteDataBorder">
                                    <span className="PublishWebsiteDataMiniToolbar">

                                    </span>
                                    <span className="PublishWebsiteDataInputSpan">
                                        <input 
                                            className="PublishWebsiteDataInput"
                                            type="text" disabled spellCheck="false" 
                                            defaultValue={`https://${this.state.publishUrl.toLowerCase()}`}
                                        />
                                    </span>
        
                                    <Button className="PublishWebsiteDataViewSite" onClick={() => {
                                        window.open(`https://${this.state.publishUrl.toLowerCase()}`, "_blank");
                                    }}>
                                        View Website
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="PublishWebsiteNext">
                                <div className="PublishWebsiteNextHeader">
                                    <div className="PublishWebsiteNextHeaderLeft">

                                    </div>
                                    <div className="PublishWebsiteNextHeaderTitle">
                                        What's Next?
                                    </div>
                                    <div className="PublishWebsiteNextHeaderRight">

                                    </div>
                                </div>
                                
                                <div className="PublishWebsiteNextTitle">
                                    Connect a custom domain
                                </div>
        
                                {/* <Button className="PublishWebsiteNextUpgrade">
                                    Upgrade Now
                                </Button> */}
                                
                                <Button className="PublishWebsiteNextDashboard">
                                    Dashboard
                                </Button>
                            </div>
                        </>
                    }
                    {
                        (this.state.status === 'loading' || this.state.status === 'publishing') &&
                        <div className="PublishWebsitePublishing">
                            <LinearProgress />
                        </div>
                    }
                    {
                        this.state.status === 'error' &&
                        <div className="PublishWebsiteError">

                        </div>
                    }
                </Paper>
            </Modal>
        )
    }
}
