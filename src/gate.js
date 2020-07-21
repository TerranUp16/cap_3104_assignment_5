import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

/*
    3.2.1.1 Gates
    The gates referred to in this section are the entrance blocking gates at both ends of the freeway.
    
    3.2.1.1.1 An icon shall be selected during detailed design to show a gate in a closed position.
    3.2.1.1.2 An icon shall be selected during detailed design to show a gate in an open position.
    3.2.1.1.3 An icon shall be selected during detailed design to show a gate in a partially open (15%) openposition.
    3.2.1.1.4 The gate icon shall be configurable to show the name of the gate with the icon.
    3.2.1.1.5 The gate icon shall be configurable to show the state of the gate (e.g., open or close).
    3.2.1.1.6 The gate icon shall be configurable to show the status of the gate (operational, failed, or no data). The color of the gate icon shall be changed to show the status of the gate.
    3.2.1.1.7 When the operator moves the mouse over a gate icon a text window shall be displayed showing a summary of the gate status.  The details of the summary status display will be defined in the GUI design document.
    3.2.1.1.8 The operator shall be able to activate a detailed device status window for the selected gate by doubleleft clicking on the icon.  This action shall cause a circle to be displayed over the gate icon for as long as the detailed device status window is displayed for that gate.
    3.2.1.1.9 The operator shall be able to activate a device control window for the selected gate by right clicking on the icon.  The right click on the icons shall display a pop-up menu of available device actions from which the user may select.  This action shall cause a circle to be displayed over the gate icon for aslong as the device control window is displayed for that gate.
    3.2.1.1.9.1 If operation of the device is locked out for safety reasons a command option will be “grayed out” and not selectable.
*/

class Gate extends React.Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'Gate';
        let open = 'Open';
        let status = 'Operational';

        // Override defaults based on props
        if (this.props.gateName in this.props) {
            name = this.props.gateName;
        }

        if (this.props.gateOpen in this.props) {
            open = this.props.gateOpen;
        }

        if (this.props.gateStatus in this.props) {
            status = this.props.gateStatus;
        }

        // Create references
        this.figureRef = React.createRef();
        this.figureImageRef = React.createRef();

        // Set state
        this.state = {
            gateName: name,
            gateShowName: false,
            gateOpen: open,
            gateShowState: false,
            gateStatus: status,
            gateShowStatus: false,
            gateShowSummary: false,
            gateShowDetailedStatus: false,
            gateShowControl: false,
            gateImage: require("./Images/gate.png"),
            caption: '',
            circle: false
        };
    }

    // Show/Hide summary
    summary = (event) => {
        let show = !this.state.gateShowSummary;
        this.setState({
            gateShowSummary: show
        });
    }

    // Show/Hide detailed status
    detailedStatus = (event) => {
        let show = !this.state.gateShowDetailedStatus;

        let circle = show || this.state.gateShowControl;

        this.setState({
            gateShowDetailedStatus: show,
            circle: circle
        }, this.setImage);
    }

    // Show/Hide contextual control
    control = (event) => {
        event.preventDefault();

        let show = !this.state.gateShowControl;

        let circle = show || this.state.gateShowDetailedStatus;

        this.setState({
            gateShowControl: show,
            circle: circle
        }, this.setImage);
    }

    // Set which image to display
    setImage = () => {
        if (this.state.gateOpen === 'Open' && !this.state.circle && this.state.gateStatus === 'Operational') {
            // Open gate painted green
            this.setState({gateImage: require("./Images/gate.png")});
        } else if (this.state.gateOpen === 'Open' && this.state.circle && this.state.gateStatus === 'Operational') {
            // Open gate painted green with circle
            this.setState({gateImage: require("./Images/gate_circled.png")});
        } else if (this.state.gateOpen === 'Open' && !this.state.circle && this.state.gateStatus === 'Failed') {
            // Open gate painted red
            this.setState({gateImage: require("./Images/gate.png")});
        } else if (this.state.gateOpen === 'Open' && this.state.circle && this.state.gateStatus === 'Failed') {
            // Open gate painted red with circle
            this.setState({gateImage: require("./Images/gate_circled.png")});
        } else if (this.state.gateOpen === 'Open' && !this.state.circle && this.state.gateStatus === 'No Data') {
            // Open gate painted gray
            this.setState({gateImage: require("./Images/gate.png")});
        } else if (this.state.gateOpen === 'Open' && this.state.circle && this.state.gateStatus === 'No Data') {
            // Open gate painted gray with circle
            this.setState({gateImage: require("./Images/gate_circled.png")});
        } else if (this.state.gateOpen === 'Partially Open' && !this.state.circle && this.state.gateStatus === 'Operational') {
            // Partially open gate painted green
            this.setState({gateImage: require("./Images/gate.png")});
        } else if (this.state.gateOpen === 'Partially Open' && this.state.circle && this.state.gateStatus === 'Operational') {
            // Partially open gate painted green with circle
            this.setState({gateImage: require("./Images/gate_circled.png")});
        } else if (this.state.gateOpen === 'Partially Open' && !this.state.circle && this.state.gateStatus === 'Failed') {
            // Partially open gate painted red
            this.setState({gateImage: require("./Images/gate.png")});
        } else if (this.state.gateOpen === 'Partially Open' && this.state.circle && this.state.gateStatus === 'Failed') {
            // Partially open gate painted red with circle
            this.setState({gateImage: require("./Images/gate_circled.png")});
        } else if (this.state.gateOpen === 'Partially Open' && !this.state.circle && this.state.gateStatus === 'No Data') {
            // Partially open gate painted gray
            this.setState({gateImage: require("./Images/gate.png")});
        } else if (this.state.gateOpen === 'Partially Open' && this.state.circle && this.state.gateStatus === 'No Data') {
            // Partially open gate painted gray with circle
            this.setState({gateImage: require("./Images/gate_circled.png")});
        } else if (this.state.gateOpen === 'Closed' && !this.state.circle && this.state.gateStatus === 'Operational') {
            // Closed gate painted green
            this.setState({gateImage: require("./Images/gate.png")});
        } else if (this.state.gateOpen === 'Closed' && this.state.circle && this.state.gateStatus === 'Operational') {
            // Closed gate painted green with circle
            this.setState({gateImage: require("./Images/gate_circled.png")});
        } else if (this.state.gateOpen === 'Closed' && !this.state.circle && this.state.gateStatus === 'Failed') {
            // Closed gate painted red
            this.setState({gateImage: require("./Images/gate.png")});
        } else if (this.state.gateOpen === 'Closed' && this.state.circle && this.state.gateStatus === 'Failed') {
            // Closed gate painted red with circle
            this.setState({gateImage: require("./Images/gate_circled.png")});
        } else if (this.state.gateOpen === 'Closed' && !this.state.circle && this.state.gateStatus === 'No Data') {
            // Closed gate painted gray
            this.setState({gateImage: require("./Images/gate.png")});
        } else if (this.state.gateOpen === 'Closed' && this.state.circle && this.state.gateStatus === 'No Data') {
            // Closed gate painted gray with circle
            this.setState({gateImage: require("./Images/gate_circled.png")});
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
        if (this.state.gateShowName && this.state.gateShowState && this.state.gateShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.gateName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.gateOpen}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.gateStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.gateShowName && this.state.gateShowState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`Name: ${this.state.gateName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`State: ${this.state.gateOpen}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.gateShowName && this.state.gateShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`Name: ${this.state.gateName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Status: ${this.state.gateStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.gateShowState && this.state.gateShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`State: ${this.state.gateOpen}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Status: ${this.state.gateStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.gateShowName) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Name: ${this.state.gateName}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.gateShowState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`State: ${this.state.gateOpen}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.gateShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Status: ${this.state.gateStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else {
            this.setState({caption: ''}, this.setImage);
        }
    }

    nameSwitch = () => {
        if (this.state.gateShowName === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.gateID}-ShowName`}
                    name="gateShowName"
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
                    id={`${this.props.gateID}-ShowName`}
                    name="gateShowName"
                    label="Show name?"
                    onChange={this.switchHandler}
                    custom
                />
            );
        }
    }

    stateSwitch = () => {
        if (this.state.gateShowState === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.gateID}-ShowState`}
                    name="gateShowState"
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
                    id={`${this.props.gateID}-ShowState`}
                    name="gateShowState"
                    label="Show state?"
                    onChange={this.switchHandler}
                    custom
                />
            );
        }
    }

    statusSwitch = () => {
        if (this.state.gateShowStatus === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.gateID}-ShowStatus`}
                    name="gateShowStatus"
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
                    id={`${this.props.gateID}-ShowStatus`}
                    name="gateShowStatus"
                    label="Show status?"
                    onChange={this.switchHandler}
                    custom
                />
            );
        }
    }

    render() {
        return (
            <>
                <Figure
                    id={this.props.gateID}
                    ref={this.figureRef}
                    onMouseOver={this.summary}
                    onDoubleClick={this.detailedStatus}
                    onContextMenu={this.control}
                >
                    <Figure.Image
                        ref={this.figureImageRef}
                        height={50}
                        alt={`${this.state.gateName} ${this.state.gateOpen}`}
                        src={this.state.gateImage}
                    />
                    {this.state.caption}
                </Figure>
                <Overlay
                    target={this.figureRef}
                    show={this.state.gateShowSummary}
                    placement="right"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`${this.state.gateName} Summary`}
                            </Popover.Title>
                            <Popover.Content>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>{`State: ${this.state.gateOpen}`}</ListGroup.Item>
                                    <ListGroup.Item>{`Status: ${this.state.gateStatus}`}</ListGroup.Item>
                                </ListGroup>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureRef}
                    show={this.state.gateShowDetailedStatus}
                    placement="bottom"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`${this.state.gateName} Detailed Status`}
                            </Popover.Title>
                            <Popover.Content>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>{`State: ${this.state.gateOpen}`}</ListGroup.Item>
                                    <ListGroup.Item>{`Status: ${this.state.gateStatus}`}</ListGroup.Item>
                                </ListGroup>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureRef}
                    show={this.state.gateShowControl}
                    placement="right"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`Control ${this.state.gateName}`}
                            </Popover.Title>
                            <Popover.Content>
                                <Form>
                                    <Form.Group controlId={`${this.props.gateID}-Name`}>
                                        <Form.Label>Change Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="gateName"
                                            placeholder={this.state.gateName}
                                            onChange={this.changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={`${this.props.gateID}-State`}>
                                        <Form.Label>Change State</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="gateOpen"
                                            custom
                                            onChange={this.changeHandler}
                                        >
                                            <option>Open</option>
                                            <option>Partially Open</option>
                                            <option>Closed</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId={`${this.props.gateID}-Status`}>
                                        <Form.Label>Change Status</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="gateStatus"
                                            custom
                                            onChange={this.changeHandler}
                                        >
                                            <option>Operational</option>
                                            <option>Failed</option>
                                            <option>No Data</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {this.nameSwitch()}
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

export default Gate;