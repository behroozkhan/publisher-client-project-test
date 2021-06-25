import React from 'react';
import './EditorHolderHeader.css';
import Button from "@material-ui/core/Button/Button";
import { WeblancerContext } from '../Contexts/WeblancerContext';
import SaveWebsite from './Components/SaveWebsite';
import ButtonBase from '@material-ui/core/ButtonBase';

export default class EditorHolderHeader extends React.Component {
    static contextType = WeblancerContext;

    constructor (props) {
        super(props);

        this.state = {
            saveState: "none"
        }
    }

    componentDidMount(){
        this.mounted = true;
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    saveWebsite = (silence = false) => (e) => {
        this.setState({
            saveState: "saving"
        })

        this.props.saveWebsite(silence, (success) => {
            if (success) {
                this.setState({
                    saveState: "none"
                })
            } else {
                this.setState({
                    saveState: "error"
                })
            }
        });
    }

    render () {
        return (
            <div className="HolderHeaderRoot">
                <div className="BrandIconHolder">
                    <img draggable={false} height={24}
                        src={require('../../images/brand.png')} />
                </div>
                <div  className="Divider">

                </div>
                <div className="LeftHolder">
                    <ButtonBase
                        onClick={(e) => {
                            this.context.pageRedirect('/dashboard');
                        }}
                    >
                        <span>Dashboard</span>
                    </ButtonBase>
                </div>
                <div className="RightHolder">
                    <Button className="RestoreEditorButton" onClick={this.props.restoreEditor}>
                        Restore Editor
                    </Button>
                    <SaveWebsite 
                        className="SaveButton"
                        onClick={this.saveWebsite}
                        saveState={this.state.saveState}
                    />
                    <Button className="PreviewButton" onClick={this.props.onPreview}>
                        Preview
                    </Button>
                    <Button className="PublishButton" onClick={this.props.onPublishClick}>
                        Publish
                    </Button>
                </div>
            </div>
        )
    }
}
