import React from 'react';
import './WebsiteItem.css';
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";

export default class WebsiteItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render () {
        let {website} = this.props;
        return (
            <Paper className="WebsiteItemRoot">
                <img className="WebsiteItemImage"/>
                <div className="WebsiteItemHover"
                     onClick={this.props.onEditClick}
                >
                    <Button
                        className="WebsiteItemEditButton"
                        onClick={this.props.onEditClick}
                    >
                        Edit Website
                    </Button>
                </div>
                <div className="WebsiteItemNameHolder">
                    <span className="WebsiteItemName">
                        {website.name}
                    </span>
                    <span className="WebsiteItemDescription">
                        {website.description}
                    </span>
                </div>
            </Paper>
        )
    }
}
