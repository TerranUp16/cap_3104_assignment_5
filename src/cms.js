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
    3.2.1.3 CMS

    3.2.1.3.1 An icon shall be selected during detailed design to indicate changeable message signs.
    3.2.1.3.2 An icon shall be selected during detailed design to indicate a changeable message sign that is displaying a message.
    3.2.1.3.3 The CMS icon shall be configurable to display the name of the sign with the icon.
    3.2.1.3.4 The CMS icon shall be configurable to display an abbreviated message text with the icon.
    3.2.1.3.5 The CMS icon shall be configurable to display the status of the sign associated with the icon. The CMS icon color shall represent the operational status of the CMS sign: green for operational, yellow for operational with errors, gray for no communications and red for failed.
    3.2.1.3.6 If the operator moves the mouse over the CMS icon then a text window shall be displayed with a summary of the operational state and status of the sign and the text of any message being displayed on the sign.
    3.2.1.3.7 The operator shall be able to activate a detailed device status window for the sign by double left clicking on the selected icon. A circle shall be displayed over the icon as long as the detailed device status window is displayed for that icon.
    3.2.1.3.8 The operator shall be able to activate a device control window for the CMS sign by right clicking on the selected icon. The right click on the icon shall display a pop-up menu of available device actions from which the user may select. A circle shall be displayed over the icon as long as the device control window is displayed for that icon.
    3.2.1.3.8.1 If operation of the device is locked out for safety reasons a command option will be “grayed out” and not selectable
*/

class CMS extends Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'CMS';
        let message = 'Hello, World!';
        let state = 'On';
        let status = 'Operational';

        // Override defaults based on props
        if (this.props.hasOwnProperty('name')) {
            name = this.props.name;
        }

        if (this.props.hasOwnProperty('message')) {
            message = this.props.message;
        }

        if (this.props.hasOwnProperty('state')) {
            status = this.props.state;
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
            message: message,
            showMessage: false,
            state: state,
            status: status
        };
    }

    // Load fresh image status as soon as possible
    componentDidMount() {
        this.setImage();
    }

    // Set which image to display
    setImage = () => {
        if (this.state.state === 'Off' && !this.state.circle && this.state.status === 'Operational') {
            // No message CMS painted green
            this.setState({image: "/Images/gate-green.svg"});
        } else if (this.state.state === 'Off' && this.state.circle && this.state.status === 'Operational') {
            // No message CMS painted green with circle
            this.setState({image: "/Images/gate-green-circle.svg"});
        } else if (this.state.state === 'Off' && !this.state.circle && this.state.status === 'Operational w/Errors') {
            // No message CMS painted yellow
            this.setState({image: "/Images/gate-yellow.svg"});
        } else if (this.state.state === 'Off' && this.state.circle && this.state.status === 'Operational w/Errors') {
            // No message CMS painted yellow with circle
            this.setState({image: "/Images/gate-yellow-circle.svg"});
        } else if (this.state.state === 'Off' && !this.state.circle && this.state.status === 'No Communication') {
            // No message CMS painted gray
            this.setState({image: "/Images/gate-gray.svg"});
        } else if (this.state.state === 'Off' && this.state.circle && this.state.status === 'No Communication') {
            // No message CMS painted gray with circle
            this.setState({image: "/Images/gate-gray-circle.svg"});
        } else if (this.state.state === 'Off' && !this.state.circle && this.state.status === 'Failed') {
            // No message CMS painted red
            this.setState({image: "/Images/gate-red.svg"});
        } else if (this.state.state === 'Off' && this.state.circle && this.state.status === 'Failed') {
            // No message CMS painted red with circle
            this.setState({image: "/Images/gate-red-circle.svg"});
        } else if (this.state.state === 'On' && !this.state.circle && this.state.status === 'Operational') {
            // Message CMS painted green
            this.setState({image: "/Images/gate-green.svg"});
        } else if (this.state.state === 'On' && this.state.circle && this.state.status === 'Operational') {
            // Message CMS painted green with circle
            this.setState({image: "/Images/gate-green-circle.svg"});
        } else if (this.state.state === 'On' && !this.state.circle && this.state.status === 'Operational w/Errors') {
            // Message CMS painted yellow
            this.setState({image: "/Images/gate-yellow.svg"});
        } else if (this.state.state === 'On' && this.state.circle && this.state.status === 'Operational w/Errors') {
            // Message CMS painted yellow with circle
            this.setState({image: "/Images/gate-yellow-circle.svg"});
        } else if (this.state.state === 'On' && !this.state.circle && this.state.status === 'No Communication') {
            // Message CMS painted gray
            this.setState({image: "/Images/gate-gray.svg"});
        } else if (this.state.state === 'On' && this.state.circle && this.state.status === 'No Communication') {
            // Message CMS painted gray with circle
            this.setState({image: "/Images/gate-gray-circle.svg"});
        } else if (this.state.state === 'On' && !this.state.circle && this.state.status === 'Failed') {
            // Message CMS painted red
            this.setState({image: "/Images/gate-red.svg"});
        } else if (this.state.state === 'On' && this.state.circle && this.state.status === 'Failed') {
            // Message CMS painted red with circle
            this.setState({image: "/Images/gate-red-circle.svg"});
        }
    }

    setCaption = () => {
        if (this.state.showName && this.state.showMessage && this.state.showState && this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.name}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showName && this.state.showMessage && this.state.showState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.name}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showName && this.state.showMessage && this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.name}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showName && this.state.showState && this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.name}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showMessage && this.state.showState && this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showName && this.state.showMessage) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.name}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showName && this.state.showState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.name}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showName && this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.name}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showMessage && this.state.showState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showMessage && this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showState && this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showName) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.name}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showMessage) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else {
            this.setState({caption: ''}, this.setImage);
        }
    }

    messageOn = () => {
        if (this.state.state === 'On') {
            return (
                <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
            )
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
            >
                <Figure
                    id={this.props.componentID}
                    ref={this.figureRef}
                    onMouseOver={() => helper.summary(this)}
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
                <Overlay
                    target={this.figureRef}
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
                                    {this.messageOn()}
                                    <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                                    <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                                </ListGroup>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureRef}
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
                                    <ListGroup.Item className="py-1">{`Message: ${this.state.message}`}</ListGroup.Item>
                                    <ListGroup.Item className="py-1">{`State: ${this.state.state}`}</ListGroup.Item>
                                    <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                                </ListGroup>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureRef}
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
                                    {helper.addText(this.props.componentID, this, 'message', 'Change Message', this.state.message)}
                                    {helper.addSelect(this.props.componentID, this, 'state', 'Change State', [
                                        'On',
                                        'Off'
                                    ])}
                                    {helper.addSelect(this.props.componentID, this, 'status', 'Change Status', [
                                        'Operational',
                                        'Operational w/Errors',
                                        'Failed',
                                        'No Communication'
                                    ])}
                                    {helper.addSwitch(this.props.componentID, this, 'showName', 'Show name?')}
                                    {helper.addSwitch(this.props.componentID, this, 'showMessage', 'Show message?')}
                                    {helper.addSwitch(this.props.componentID, this, 'showState', 'Show state?')}
                                    {helper.addSwitch(this.props.componentID, this, 'showStatus', 'Show status?')}
                                    {helper.addSwitch(this.props.componentID, this, 'safetyLock', 'Enable safety lock')}
                                </Form>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
            </div>
        );
    }
}

export default CMS;