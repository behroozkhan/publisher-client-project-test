import React from 'react';
import Modal from '@material-ui/core/Modal';

export default class Dimmer extends React.Component {
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
            <Modal
                open={true}
            >
            </Modal>
        )
    }
}
