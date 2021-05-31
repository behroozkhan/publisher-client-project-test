import React from 'react';
import './Dashboard.css';
import WebsiteItem from "./WebsiteItem";
import Button from "@material-ui/core/Button/Button";
import NewWebsiteModal from "./NewWebsiteModal";
import { Server, WeblancerContext } from './../Contexts/WeblancerContext';

export default class Dashboard extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);
        this.state = {
            websites: [],
            loading: true
        };
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
        Server.getUserWebsites((success, data, error) => {
            if (!this.mounted) return;

            if (success)
                this.setState({websites: data.rows, loading: false});
            else
                this.setState({error, loading: false});
        });
    };

    onEditWebsite = (website) => (e) => {
        e.stopPropagation();
        e.preventDefault();

        this.context.pageRedirect(`/holder/${website.id}`);
    };

    render () {
        return (
            <div className="DashboardPage">
                <div className="DashboardNewWebsiteBox">
                    <Button
                        className="DashboardNewWebsiteButton"
                        variant="contained" color="primary"
                        onClick={(e) => {this.setState({newWebsite: {}})}}
                    >
                        Create New Website
                    </Button>
                </div>
                <div className="DashboardWebsiteGrid">
                    {console.log(this.state.websites)}
                    {
                        this.state.websites.map(website => {
                            return (
                                <WebsiteItem
                                    key={website.name}
                                    website={website}
                                    onEditClick={this.onEditWebsite(website)}
                                />
                            )
                        })
                    }
                </div>

                {
                    this.state.newWebsite &&
                    <NewWebsiteModal
                        newWebsite={this.state.newWebsite}
                        onWebsiteCreated={() => {
                            this.setState({newWebsite: undefined});
                            this.load();
                        }}
                        onClose={() => {this.setState({newWebsite: undefined})}}
                    />
                }
            </div>
        )
    }
}
