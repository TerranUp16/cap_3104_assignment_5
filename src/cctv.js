import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import * as helper from './helper';

/*
    3.2.1.4 CCTV Camera

    3.2.1.4.1 An icon shall be selected to indicate a CCTV camera
    3.2.1.4.2 The camera icon shall be configurable to show the name of the camera with the icon.
    3.2.1.4.3 The camera icon shall be configurable to show the state of the camera.
    3.2.1.4.4 The camera icon shall be configurable to show the status of the camera. The color of the camera icon shall be changed to show the status of the camera.
    3.2.1.4.5 When a user moves the mouse over a camera icon a text window shall be displayed showing a summary of the camera status.
    3.2.1.4.6 The user shall be able to activate a detailed device status window for the selected camera by double left clicking on the icon. This action shall cause a circle to be displayed over the camera icon for as long as the detailed device status window is displayed for that camera.
    3.2.1.4.7 The user shall be able to activate a device control window for the selected camera by right clicking on the icon. The right click on the icon shall display a pop-up menu of available device actions from which the user may select. This action shall cause a circle to be displayed over the camera icon for as long as the device control window is displayed for that camera.
*/

/*
NEEDS-
    Popover for cctv summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Control is on right-click
Props-
    cctvName: String,
    cctvShowName: [true, false],
    cctvState: [on, off],
    cctvShowState: [true, false],
    cctvStatus: [operational, no communication, failed],
    cctvShowStatus: [true, false]
*/
class CCTV extends React.Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'Camera';
        let state = 'On';
        let status = 'Operational'

        // Override defaults based on props
        if (this.props.hasOwnProperty('cctvName')) {
            name = this.props.cctvName;
        }

        if (this.props.hasOwnProperty('cctvState')) {
            state = this.props.cctvState;
        }

        if (this.props.hasOwnProperty('cctvStatus')) {
            status = this.props.cctvStatus;
        }

        // Create references
        this.figureRef = React.createRef();
        this.figureImageRef = React.createRef();
        
        // Set state
        this.state = {
            cctvName: name,
            cctvShowName: false,
            cctvState: state,
            cctvShowState: false,
            cctvStatus: status,
            cctvShowStatus: false,
            cctvShowSummary: false,
            cctvShowDetailedStatus: false,
            cctvShowControl: false,
            cctvImage: require("./Images/gate.png"),
            caption: '',
            circle: false
        }
    }

    // Show/Hide summary
    summary = (event) => {
        let show = !this.state.cctvShowSummary;
        this.setState({
            cctvShowSummary: show
        });
    }

    // Show/Hide detailed status
    detailedStatus = (event) => {
        let show = !this.state.cctvShowDetailedStatus;

        let circle = show || this.state.cctvShowControl;

        this.setState({
            cctvShowDetailedStatus: show,
            circle: circle
        }, this.setImage);
    }

    // Show/Hide contextual control
    control = (event) => {
        event.preventDefault();

        let show = !this.state.cctvShowControl;

        let circle = show || this.state.cctvShowDetailedStatus;

        this.setState({
            cctvShowControl: show,
            circle: circle
        }, this.setImage);
    }

    
}

export default CCTV;