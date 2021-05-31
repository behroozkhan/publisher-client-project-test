import React from 'react';
import Button from "@material-ui/core/Button/Button";
import { CircularProgress } from '@material-ui/core';

export default class SaveWebsite extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount(){
        this.mounted = true;
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render () {
        return (
            <>
                <Button 
                    className="SaveButton" 
                    onClick={this.props.onClick(false)}
                    disabled={this.props.saveState === 'saving'}
                >
                    {
                        this.props.saveState === 'saving' ?
                            <CircularProgress size={16}/>
                            :
                            <p style={{
                                margin: 0,
                                color: this.props.saveState === 'error' ? "rgb(247 4 4)" :"#6f6f6f"
                            }}>
                                Save
                            </p>
                    }
                </Button>
            </>
        )
    }
}
