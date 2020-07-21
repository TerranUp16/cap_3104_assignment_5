import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
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

class CMS extends React.Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'CMS';
        let message = 'Hello, World!';
        let state = 'On';
        let status = 'Operational';

        // Override defaults based on props
        if (this.props.hasOwnProperty('cmsName')) {
            name = this.props.cmsName;
        }

        if (this.props.hasOwnProperty('cmsMessage')) {
            message = this.props.cmsMessage;
        }

        if (this.props.hasOwnProperty('cmsState')) {
            status = this.props.cmsState;
        }

        if (this.props.hasOwnProperty('cmsStatus')) {
            status = this.props.cmsStatus;
        }

        // Create references
        this.figureRef = React.createRef();
        this.figureImageRef = React.createRef();

        // Set state
        this.state = {
            cmsName: name,
            cmsShowName: false,
            cmsMessage: message,
            cmsShowMessage: false,
            cmsState: state,
            cmsShowState: false,
            cmsStatus: status,
            cmsShowStatus: false,
            cmsShowSummary: false,
            cmsShowDetailedStatus: false,
            cmsShowControl: false,
            cmsImage: require("./Images/gate.png"),
            caption: '',
            circle: false
        }
    }

    // Show/Hide summary
    summary = (event) => {
        let show = !this.state.cmsShowSummary;
        this.setState({
            cmsShowSummary: show
        });
    }

    // Show/Hide detailed status
    detailedStatus = (event) => {
        let show = !this.state.cmsShowDetailedStatus;

        let circle = show || this.state.cmsShowControl;

        this.setState({
            cmsShowDetailedStatus: show,
            circle: circle
        }, this.setImage);
    }

    // Show/Hide contextual control
    control = (event) => {
        event.preventDefault();

        let show = !this.state.cmsShowControl;

        let circle = show || this.state.cmsShowDetailedStatus;

        this.setState({
            cmsShowControl: show,
            circle: circle
        }, this.setImage);
    }

    // Set which image to display
    setImage = () => {
        if (this.state.cmsState === 'Off' && !this.state.circle && this.state.cmsStatus === 'Operational') {
            // No message CMS painted green
            this.setState({cmsImage: require("./Images/gate.png")});
        } else if (this.state.cmsState === 'Off' && this.state.circle && this.state.cmsStatus === 'Operational') {
            // No message CMS painted green with circle
            this.setState({cmsImage: require("./Images/gate_circled.png")});
        } else if (this.state.cmsState === 'Off' && !this.state.circle && this.state.cmsStatus === 'Operational w/Errors') {
            // No message CMS painted yellow
            this.setState({cmsImage: require("./Images/gate.png")});
        } else if (this.state.cmsState === 'Off' && this.state.circle && this.state.cmsStatus === 'Operational w/Errors') {
            // No message CMS painted yellow with circle
            this.setState({cmsImage: require("./Images/gate_circled.png")});
        } else if (this.state.cmsState === 'Off' && !this.state.circle && this.state.cmsStatus === 'No Communication') {
            // No message CMS painted gray
            this.setState({cmsImage: require("./Images/gate.png")});
        } else if (this.state.cmsState === 'Off' && this.state.circle && this.state.cmsStatus === 'No Communication') {
            // No message CMS painted gray with circle
            this.setState({cmsImage: require("./Images/gate_circled.png")});
        } else if (this.state.cmsState === 'Off' && !this.state.circle && this.state.cmsStatus === 'Failed') {
            // No message CMS painted red
            this.setState({cmsImage: require("./Images/gate.png")});
        } else if (this.state.cmsState === 'Off' && this.state.circle && this.state.cmsStatus === 'Failed') {
            // No message CMS painted red with circle
            this.setState({cmsImage: require("./Images/gate_circled.png")});
        } else if (this.state.cmsState === 'On' && !this.state.circle && this.state.cmsStatus === 'Operational') {
            // Message CMS painted green
            this.setState({cmsImage: require("./Images/gate.png")});
        } else if (this.state.cmsState === 'On' && this.state.circle && this.state.cmsStatus === 'Operational') {
            // Message CMS painted green with circle
            this.setState({cmsImage: require("./Images/gate_circled.png")});
        } else if (this.state.cmsState === 'On' && !this.state.circle && this.state.cmsStatus === 'Operational w/Errors') {
            // Message CMS painted yellow
            this.setState({cmsImage: require("./Images/gate.png")});
        } else if (this.state.cmsState === 'On' && this.state.circle && this.state.cmsStatus === 'Operational w/Errors') {
            // Message CMS painted yellow with circle
            this.setState({cmsImage: require("./Images/gate_circled.png")});
        } else if (this.state.cmsState === 'On' && !this.state.circle && this.state.cmsStatus === 'No Communication') {
            // Message CMS painted gray
            this.setState({cmsImage: require("./Images/gate.png")});
        } else if (this.state.cmsState === 'On' && this.state.circle && this.state.cmsStatus === 'No Communication') {
            // Message CMS painted gray with circle
            this.setState({cmsImage: require("./Images/gate_circled.png")});
        } else if (this.state.cmsState === 'On' && !this.state.circle && this.state.cmsStatus === 'Failed') {
            // Message CMS painted red
            this.setState({cmsImage: require("./Images/gate.png")});
        } else if (this.state.cmsState === 'On' && this.state.circle && this.state.cmsStatus === 'Failed') {
            // Message CMS painted red with circle
            this.setState({cmsImage: require("./Images/gate_circled.png")});
        }
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val}, this.setCaption);
    }

    switchHandler = (event) => {
        let nam = event.target.name;
        let newState = !this.state[nam];
        this.setState({[nam]: newState}, this.setCaption);
    }

    setCaption = () => {
        if (this.state.cmsShowName && this.state.cmsShowMessage && this.state.cmsShowState && this.state.cmsShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.cmsName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.cmsState}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.cmsStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowName && this.state.cmsShowMessage && this.state.cmsShowState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`Name: ${this.state.cmsName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`State: ${this.state.cmsState}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowName && this.state.cmsShowMessage && this.state.cmsShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`Name: ${this.state.cmsName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`State: ${this.state.cmsStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowName && this.state.cmsShowState && this.state.cmsShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`Name: ${this.state.cmsName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`State: ${this.state.cmsState}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Status: ${this.state.cmsStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowMessage && this.state.cmsShowState && this.state.cmsShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`State: ${this.state.cmsState}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Status: ${this.state.cmsStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowName && this.state.cmsShowMessage) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Name: ${this.state.cmsName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-3">{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowName && this.state.cmsShowState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Name: ${this.state.cmsName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-3">{`State: ${this.state.cmsState}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowName && this.state.cmsShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Name: ${this.state.cmsName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-3">{`Status: ${this.state.cmsStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowMessage && this.state.cmsShowState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
                            <ListGroup.Item className="py-3">{`State: ${this.state.cmsState}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowMessage && this.state.cmsShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
                            <ListGroup.Item className="py-3">{`Status: ${this.state.cmsStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowState && this.state.cmsShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`State: ${this.state.cmsState}`}</ListGroup.Item>
                            <ListGroup.Item className="py-3">{`Status: ${this.state.cmsStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowName) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-4">{`Name: ${this.state.cmsName}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowMessage) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-4">{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-4">{`State: ${this.state.cmsState}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.cmsShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-4">{`Status: ${this.state.cmsStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else {
            this.setState({caption: ''}, this.setImage);
        }
    }

    nameSwitch = () => {
        if (this.state.cmsShowName === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.cmsID}-ShowName`}
                    name="cmsShowName"
                    label="Show name?"
                    onChange={this.switchHandler}
                    custom
                    checked
                />
            );
        } else {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.cmsID}-ShowName`}
                    name="cmsShowName"
                    label="Show name?"
                    onChange={this.switchHandler}
                    custom
                />
            );
        }
    }

    messageSwitch = () => {
        if (this.state.cmsShowMessage === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.cmsID}-ShowMessage`}
                    name="cmsShowMessage"
                    label="Show message?"
                    onChange={this.switchHandler}
                    custom
                    checked
                />
            );
        } else {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.cmsID}-ShowMessage`}
                    name="cmsShowMessage"
                    label="Show message?"
                    onChange={this.switchHandler}
                    custom
                />
            );
        }
    }

    stateSwitch = () => {
        if (this.state.cmsShowState === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.cmsID}-ShowState`}
                    name="cmsShowState"
                    label="Show state?"
                    onChange={this.switchHandler}
                    custom
                    checked
                />
            );
        } else {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.cmsID}-ShowState`}
                    name="cmsShowState"
                    label="Show state?"
                    onChange={this.switchHandler}
                    custom
                />
            );
        }
    }

    statusSwitch = () => {
        if (this.state.cmsShowStatus === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.cmsID}-ShowStatus`}
                    name="cmsShowStatus"
                    label="Show status?"
                    onChange={this.switchHandler}
                    custom
                    checked
                />
            );
        } else {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.cmsID}-ShowStatus`}
                    name="cmsShowStatus"
                    label="Show status?"
                    onChange={this.switchHandler}
                    custom
                />
            );
        }
    }

    messageOn = () => {
        if (this.state.cmsState === 'On') {
            return (
                <ListGroup.Item>{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
            )
        }
    }

    render() {
        return (
            <>
                <Figure
                    id={this.props.cmsID}
                    ref={this.figureRef}
                    onMouseOver={this.summary}
                    onDoubleClick={this.detailedStatus}
                    onContextMenu={this.control}
                >
                    <Figure.Image
                        ref={this.figureImageRef}
                        height={50}
                        alt={`${this.state.cmsName} ${this.state.cmsState}`}
                        src={this.state.cmsImage}
                    />
                    {this.state.caption}
                </Figure>
                <Overlay
                    target={this.figureRef}
                    show={this.state.cmsShowSummary}
                    placement="right"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`${this.state.cmsName} Summary`}
                            </Popover.Title>
                            <Popover.Content>
                                <ListGroup variant="flush">
                                    {this.messageOn()}
                                    <ListGroup.Item>{`State: ${this.state.cmsState}`}</ListGroup.Item>
                                    <ListGroup.Item>{`Status: ${this.state.cmsStatus}`}</ListGroup.Item>
                                </ListGroup>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureRef}
                    show={this.state.cmsShowDetailedStatus}
                    placement="bottom"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`${this.state.cmsName} Detailed Status`}
                            </Popover.Title>
                            <Popover.Content>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>{`Message: ${this.state.cmsMessage}`}</ListGroup.Item>
                                    <ListGroup.Item>{`State: ${this.state.cmsState}`}</ListGroup.Item>
                                    <ListGroup.Item>{`Status: ${this.state.cmsStatus}`}</ListGroup.Item>
                                </ListGroup>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureRef}
                    show={this.state.cmsShowControl}
                    placement="right"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`Control ${this.state.cmsName}`}
                            </Popover.Title>
                            <Popover.Content>
                                <Form>
                                    <Form.Group controlId={`${this.props.cmsID}-Name`}>
                                        <Form.Label>Change Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cmsName"
                                            placeholder={this.state.cmsName}
                                            onChange={this.changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={`${this.props.cmsID}-Name`}>
                                        <Form.Label>Change Message</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cmsMessage"
                                            placeholder={this.state.cmsMessage}
                                            onChange={this.changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={`${this.props.cmsID}-State`}>
                                        <Form.Label>Change State</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="cmsState"
                                            custom
                                            onChange={this.changeHandler}
                                        >
                                            {helper.selectedOption(this.state.cmsState, 'On')}
                                            {helper.selectedOption(this.state.cmsState, 'Off')}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId={`${this.props.cmsID}-Status`}>
                                        <Form.Label>Change Status</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="cmsStatus"
                                            custom
                                            onChange={this.changeHandler}
                                        >
                                            {helper.selectedOption(this.state.cmsStatus, 'Operational')}
                                            {helper.selectedOption(this.state.cmsStatus, 'Operational w/Errors')}
                                            {helper.selectedOption(this.state.cmsStatus, 'Failed')}
                                            {helper.selectedOption(this.state.cmsStatus, 'No Communication')}
                                        </Form.Control>
                                    </Form.Group>
                                    {this.nameSwitch()}
                                    {this.messageSwitch()}
                                    {this.stateSwitch()}
                                    {this.statusSwitch()}
                                </Form>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
            </>
        );
    }
}

export default CMS;