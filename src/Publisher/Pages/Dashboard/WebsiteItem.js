import React from 'react';
import './WebsiteItem.css';
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import {WeblancerContext} from "../Contexts/WeblancerContext";

export default class WebsiteItem extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    getUrl = () => {
        let {website} = this.props;
        let {user} = this.context;

        if (website.url)
            return website.url;

        let url = new URL(website.metadata.siteData.setting.baseUrl);
        url.hostname = `${user.username}.${url.hostname}`;
        url.pathname = website.name;

        return url.href.toLowerCase();
    }

    render () {
        let {website} = this.props;
        return (
            <Paper className="WebsiteItemRoot">
                <img draggable={false} className="WebsiteItemImage"
                     src={require('../../images/tempwebsite.jpg')} />
                <div className="WebsiteItemHover"
                     // onClick={this.props.onEditClick}
                >
                    <Button
                        className="WebsiteItemEditButton"
                        onClick={this.props.onEditClick}
                    >
                        Edit
                    </Button>
                    <Button
                        className="WebsiteItemEditButton"
                        onClick={this.props.onDashboarClick}
                    >
                        Dashboard
                    </Button>
                </div>
                <div className="WebsiteItemNameHolder">
                    <span className="WebsiteItemName">
                        {website.name}
                    </span>
                    <span className="WebsiteItemDescription">
                        {website.description}
                    </span>
                    {
                        !website.metadata.isPublished &&
                        <span className="WebsiteItemUrl">
                            Not Published
                        </span>
                    }
                    {
                        website.metadata.isPublished &&
                        <a className="WebsiteItemUrl" href={this.getUrl()} target="_blank">
                            {this.getUrl()}
                        </a>
                    }
                </div>
            </Paper>
        )
    }
}
