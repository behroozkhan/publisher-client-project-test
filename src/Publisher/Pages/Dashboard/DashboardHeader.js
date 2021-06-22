import React from 'react';
import './DashboardHeader.css';
import { WeblancerContext } from '../Contexts/WeblancerContext';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class DashboardHeader extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);
        this.state = {
            userDD: false
        };
    }

    componentDidMount(){
        this.mounted = true;
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render () {
        let {user} = this.context;
        let {userDD, userDDanchorEl} = this.state;
        return (
            <div className="DashboardHeaderRoot">
                <div className="DashboardHeaderLogo">
                    <img draggable={false} className="DashboardHeaderLogoImage"
                         src={require('../../images/brand.png')} />
                </div>
                <div className="DashboardHeaderMenu">

                </div>
                <div className="DashboardHeaderRightBar">
                    <ButtonBase
                        onClick={(e) => {this.setState({userDD: true, userDDanchorEl: e.target})}}
                    >
                        <div className="DashboardHeaderUser">
                            <img draggable={false} className="DashboardHeaderUserImage"
                                 src={require('../../images/user.svg')} />
                        </div>
                    </ButtonBase>
                </div>

                {
                    userDD &&
                    <Menu
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        anchorEl={userDDanchorEl}
                        keepMounted
                        open={userDD}
                        onClose={() => {this.setState({userDD: false})}}
                    >
                        <MenuItem className="UserDDUserItem">
                            <div className="UserDDUserItemRoot">
                                <div className="UserDDUserItemIcon">
                                    <img draggable={false} className="DashboardHeaderUserImage"
                                         src={require('../../images/user.svg')} />
                                </div>
                                <div className="UserDDUserItemName">
                                    Behrooz Arabzade
                                </div>
                            </div>
                        </MenuItem>
                        <MenuItem
                            className="UserDDAccountItem"
                            onClick={() => {
                                // TODO got to account page
                            }}
                        >
                            Account Setting
                        </MenuItem>
                        <MenuItem
                            className="UserDDCommonItem"
                            onClick={() => {
                                // TODO got to domains page
                            }}
                        >
                            Domains
                        </MenuItem>
                        <div
                            className="UserDDFooterItem"
                        >
                            <div className="UserDDFooterItemRoot">
                                <ButtonBase
                                    className="UserDDFooterItemLogout"
                                    onClick={(e) => {
                                        // TODO got to logout user
                                    }}
                                >
                                    <div>
                                        Logout
                                    </div>
                                </ButtonBase>
                            </div>
                        </div>
                    </Menu>
                }
            </div>
        )
    }
}
