import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Component from './component';
import * as helper from './helper';

/*
    3.2.1.5 Draw Lights

    3.2.1.5.1 An icon shall be selected during detailed design to indicate a group of draw lights that are off.
    3.2.1.5.2 An icon shall be selected during detailed design to indicate a group of draw lights that are on.
    3.2.1.5.3 An icon shall be selected during detailed design to indicate a group of draw lights where some are on and some are off.
    3.2.1.5.4 The draw light icon shall be configurable to display the name of the draw lights.
    3.2.1.5.5 The draw light icon shall be configurable to display the state of the draw lights.
    3.2.1.5.6 The draw light icon shall be configurable to display the status of the draw lights. The color of the draw light icon shall represent the status of the draw light: green for operational, yellow for operational with errors, gray for no communications and red for failed.
    3.2.1.5.7 When the operator moves the mouse over a draw light icon a text window shall be displayed showing a summary of the status of the group of draw lights. The details of the status display will be defined in the GUI design document.
    3.2.1.5.8 The operator shall be able to activate a detailed device status window for the draw lights by double left clicking on the selected icon. A circle shall be displayed over the icon as long as the detailed device status window is displayed for that icon.
    3.2.1.5.9 The operator shall be able to activate a device control window for the draw lights by right clicking on the selected icon. The right click on the icon shall display a pop-up menu of available device actions from which the user may select. A circle shall be displayed over the icon as long as the device control window is displayed for that icon.
    3.2.1.5.9.1 If operation of the device is locked out for safety reasons the command option will be “grayed out” and not selectable.
*/

class DrawLights extends Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'Draw Lights';
        let state = 'Off' ;
        let status = 'Operational';

        // Override defaults based on props
        if (this.props.hasOwnProperty('name')) {
            name = this.props.name;
        }

        if (this.props.hasOwnProperty('state')) {
            state = this.props.state;
        }

        if (this.props.hasOwnProperty('status')) {
            status = this.props.status;
        }

        // Create references
        this.figureRef = React.createRef();
        this.figureImageRef = React.createRef();

        // Set state
        this.state = {
            ...this.state,
            name: name,
            state: state,
            status: status,
            image: "/Images/draw-lights-green-on.svg"
        }
    }

    // Set which image to display
    setImage = () => {
        if (this.state.state === 'Off' && this.state.status === 'Operational') {
            // Off draw lights painted green
            this.setState({image: "/Images/draw-lights-green-off.svg"});
        } else if (this.state.state === 'Off' && this.state.status === 'Operational w/Errors') {
            // Off draw lights painted yellow
            this.setState({image: "/Images/draw-lights-gate-yellow-off.svg"});
        } else if (this.state.state === 'Off' && this.state.status === 'Failed') {
            // Off draw lights painted red
            this.setState({image: "/Images/draw-lights-gate-red-off.svg"});
        } else if (this.state.state === 'Off' && this.state.status === 'No Communication') {
            // Off draw lights painted gray
            this.setState({image: "/Images/draw-lights-gray-off.svg"});
        } else if (this.state.state === 'On' && this.state.status === 'Operational') {
            // On draw lights painted green
            this.setState({image: "/Images/draw-lights-green-on.svg"});
        } else if (this.state.state === 'On' && this.state.status === 'Operational w/Errors') {
            // On draw lights painted yellow
            this.setState({image: "/Images/draw-lights-yellow-on.svg"});
        } else if (this.state.state === 'On' && this.state.status === 'Failed') {
            // On draw lights painted red
            this.setState({image: "/Images/draw-lights-red-on.svg"});
        } else if (this.state.state === 'On' && this.state.status === 'No Communication') {
            // On draw lights painted gray
            this.setState({image: "/Images/draw-lights-gray-on.svg"});
        } else if (this.state.state === 'Partially On' && this.state.status === 'Operational') {
            // Partially on draw lights painted green
            this.setState({image: "/Images/draw-lights-green-on-off.svg"});
        } else if (this.state.state === 'Partially On' && this.state.status === 'Operational w/Errors') {
            // Partially on draw lights painted yellow
            this.setState({image: "/Images/draw-lights-yellow-on-off.svg"});
        } else if (this.state.state === 'Partially On' && this.state.status === 'Failed') {
            // Partially on draw lights painted red
            this.setState({image: "/Images/draw-lights-red-on-off.svg"});
        } else if (this.state.state === 'Partially On' && this.state.status === 'No Communication') {
            // Partially on draw lights painted gray
            this.setState({image: "/Images/draw-lights-gray-on-off.svg"});
        }
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    left: this.state.x,
                    top: this.state.y
                }}
                onClick={(e) => this.props.removeComponent(this.props.componentID)}
            >
                <Figure
                    id={this.props.componentID}
                    ref={this.figureRef}
                    onMouseOver={() => helper.summary(this)}
                    onMouseOut={() => helper.summary(this)}
                    onDoubleClick={() => helper.detailedStatus(this)}
                    onContextMenu={(e) => helper.control(e, this)}
                >
                    <Figure.Image
                        ref={this.figureImageRef}
                        height={this.state.height}
                        width={this.state.width}
                        alt={`${this.state.name} ${this.state.state}`}
                        src={this.state.image}
                    />
                    {this.state.caption}
                </Figure>
                {this.greenCircle()}
                <Overlay
                    target={this.figureImageRef}
                    show={this.state.showSummary}
                    placement="right"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`${this.state.name} Summary`}
                            </Popover.Title>
                            <Popover.Content>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                                    <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                                </ListGroup>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureImageRef}
                    show={this.state.showDetailedStatus}
                    placement="bottom"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`${this.state.name} Detailed Status`}
                            </Popover.Title>
                            <Popover.Content>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                                    <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                                </ListGroup>
                                {helper.addCloseButton(this)}
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureImageRef}
                    show={this.state.showControl}
                    placement="right"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`Control ${this.state.name}`}
                            </Popover.Title>
                            <Popover.Content>
                                <Form>
                                    {helper.addText(this.props.componentID, this, 'name', 'Change Name', this.state.name)}
                                    {helper.addSelect(this.props.componentID, this, 'state', 'Change State', [
                                        'Off',
                                        'On',
                                        'Partially On'
                                    ])}
                                    {helper.addSelect(this.props.componentID, this, 'status', 'Change Status', [
                                        'Operational',
                                        'Operational w/Errors',
                                        'Failed',
                                        'No Communication'
                                    ])}
                                    {helper.addSwitch(this.props.componentID, this, 'showName', 'Show name?')}
                                    {helper.addSwitch(this.props.componentID, this, 'showState', 'Show state?')}
                                    {helper.addSwitch(this.props.componentID, this, 'showStatus', 'Show status?')}
                                    {helper.addSwitch(this.props.componentID, this, 'safetyLock', 'Enable safety lock')}
                                    {helper.addOkayButton(this)}
                                </Form>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
            </div>
        );
    }
}

export default DrawLights;