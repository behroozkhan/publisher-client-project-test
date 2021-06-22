import React from 'react';
import './WebsiteItem.css';
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";

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
                        // onClick={this.props.onEditClick}
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
                </div>
            </Paper>
        )
    }
}
