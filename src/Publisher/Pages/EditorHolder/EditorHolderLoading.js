import React from 'react';
import './EditorHolder.css';
import { WeblancerContext } from '../Contexts/WeblancerContext';
import ReactLoading from 'react-loading';

export default class EditorHolderLoading extends React.Component {
    static contextType = WeblancerContext;

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
            <div className="EditorHolderLoading">
                <ReactLoading type={'bubbles'} 
                    color={"#9AB0AF"} 
                    height={'85px'} 
                    width={'85px'} 
                />
            </div>
        )
    }
}
