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
    3.2.1.2 Popups

    3.2.1.2.1 An icon shall be selected during detailed design to indicate a group of popups in an “Up” or entrance closed position.
    3.2.1.2.2 An icon shall be selected during detailed design to indicate a group of popups in a “Down” or entrance opened position.
    3.2.1.2.3 An icon shall be selected during detailed design to indicate a failure status when some popups in a group are in a “Down” position and some popups in the same group are in an “Up’ position.
    3.2.1.2.4 The popup icon shall be configurable to display the name of the popup group.
    3.2.1.2.5 The popup icon shall be configurable to display the state of the popup group (up or down).
    3.2.1.2.6 The popup icon shall be configurable to display the status of the popup group. The color of the icon shall be changed to show the status of the popup group.
    3.2.1.2.7 When the operator moves the mouse over a popup icon a text window shall be displayed showing a summary of the popup group status. The details of the status display will be defined in the GUI design document.
    3.2.1.2.8 The operator shall be able to activate a detailed device status window for the selected popup group by double left clicking on the icon. A circle shall be displayed over the icon as long as the detailed status window is displayed for the icon.
    3.2.1.2.9 The operator shall be able to activate a device control window for the selected popup by right clicking on the icon. The right click on the icon shall display a pop-up menu of available device actions from which the user may select. A circle shall be displayed over the icon as long as the device control window is displayed for the icon.
    3.2.1.2.9.1 If operation of the device is locked out for safety reasons a command option will be “grayed out” and not selectable.
*/

class Popups extends Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'Popup Group';
        let state = 'Down' ;
        let status = 'Operational' ;

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
            image: "/Images/popup-green-closed.svg"
        }
    }

    // Set which image to display
    setImage = () => {
        if (this.state.status === 'Failed') {
            // If popup group is in a failed state, we need to display the failed state image regardless of whether state is up or down
            this.setState({image: "/Images/popup-red-closed.svg"});
        } else if (this.state.state === 'Up' && this.state.status === 'Operational') {
            // Up popup group painted green
            this.setState({image: "/Images/popup-green-closed.svg"});
        } else if (this.state.state === 'Up' && this.state.status === 'No Data') {
            // Up popup group painted gray
            this.setState({image: "/Images/popup-gray-closed.svg"});
        } else if (this.state.state === 'Down' && this.state.status === 'Operational') {
            // Down popup group painted green
            this.setState({image: "/Images/popup-green-open.svg"});
        } else if (this.state.state === 'Down' && this.state.status === 'No Data') {
            // Down popup group painted gray
            this.setState({image: "/Images/popup-gray-open.svg"});
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
                                        'Down',
                                        'Up'
                                    ])}
                                    {helper.addSelect(this.props.componentID, this, 'status', 'Change Status', [
                                        'Operational',
                                        'Failed',
                                        'No Data'
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

export default Popups;