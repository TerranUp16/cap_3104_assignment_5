import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

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

class Popups extends React.Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'Popup Group';
        let state = 'Down' ;
        let status = 'Operational' ;

        // Override defaults based on props
        if (this.props.popupGroupName in this.props) {
            name = this.props.popupGroupName;
        }

        if (this.props.popupGroupState in this.props) {
            state = this.props.popupGroupState;
        }

        if (this.props.popupGroupStatus in this.props) {
            status = this.props.popupGroupState;
        }

        // Create references
        this.figureRef = React.createRef();
        this.figureImageRef = React.createRef();

        // Set state
        this.state = {
            popupGroupName: name,
            popupGroupShowName: false,
            popupGroupState: state,
            popupGroupShowState: false,
            popupGroupStatus: status,
            popupGroupShowStatus: false,
            popupGroupShowSummary: false,
            popupGroupShowDetailedStatus: false,
            popupGroupShowControl: false,
            popupGroupImage: require("./Images/gate.png"),
            caption: '',
            circle: false
        }
    }

    // Show/Hide summary
    summary = (event) => {
        let show = !this.state.popupGroupShowSummary;
        this.setState({
            popupGroupShowSummary: show
        });
    }

    // Show/Hide detailed status
    detailedStatus = (event) => {
        let show = !this.state.popupGroupShowDetailedStatus;

        let circle = show || this.state.popupGroupShowControl;

        this.setState({
            popupGroupShowDetailedStatus: show,
            circle: circle
        }, this.setImage);
    }

    // Show/Hide contextual control
    control = (event) => {
        event.preventDefault();

        let show = !this.state.popupGroupShowControl;

        let circle = show || this.state.popupGroupShowDetailedStatus;

        this.setState({
            popupGroupShowControl: show,
            circle: circle
        }, this.setImage);
    }

    // Set which image to display
    setImage = () => {
        if (this.state.popupGroupStatus === 'Failed' && !this.state.circle) {
            // If popup group is in a failed state, we need to display the failed state image regardless of whether state is up or down
            this.setState({popupGroupImage: require("./Images/gate.png")});
        } else if (this.state.popupGroupStatus === 'Failed' && this.state.circle) {
            // If popup group is in a failed state, we need to display the failed state image regardless of whether state is up or down (in this case, with circle)
            this.setState({popupGroupImage: require("./Images/gate_circled.png")});
        } else if (this.state.popupGroupState === 'Up' && !this.state.circle && this.state.popupGroupStatus === 'Operational') {
            // Up popup group painted green
            this.setState({popupGroupImage: require("./Images/gate.png")});
        } else if (this.state.popupGroupState === 'Up' && this.state.circle && this.state.popupGroupStatus === 'Operational') {
            // Up popup group painted green with circle
            this.setState({popupGroupImage: require("./Images/gate_circled.png")});
        } else if (this.state.popupGroupState === 'Up' && !this.state.circle && this.state.popupGroupStatus === 'No Data') {
            // Up popup group painted gray
            this.setState({popupGroupImage: require("./Images/gate.png")});
        } else if (this.state.popupGroupState === 'Up' && this.state.circle && this.state.popupGroupStatus === 'No Data') {
            // Up popup group painted gray with circle
            this.setState({popupGroupImage: require("./Images/gate_circled.png")});
        } else if (this.state.popupGroupState === 'Down' && !this.state.circle && this.state.popupGroupStatus === 'Operational') {
            // Down popup group painted green
            this.setState({popupGroupImage: require("./Images/gate.png")});
        } else if (this.state.popupGroupState === 'Down' && this.state.circle && this.state.popupGroupStatus === 'Operational') {
            // Down popup group painted green with circle
            this.setState({popupGroupImage: require("./Images/gate_circled.png")});
        } else if (this.state.popupGroupState === 'Down' && !this.state.circle && this.state.popupGroupStatus === 'No Data') {
            // Down popup group painted gray
            this.setState({popupGroupImage: require("./Images/gate.png")});
        } else if (this.state.popupGroupState === 'Down' && this.state.circle && this.state.popupGroupStatus === 'No Data') {
            // Down popup group painted gray with circle
            this.setState({popupGroupImage: require("./Images/gate_circled.png")});
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
        if (this.state.popupGroupShowName && this.state.popupGroupShowState && this.state.popupGroupShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-1">{`Name: ${this.state.popupGroupName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`State: ${this.state.popupGroupState}`}</ListGroup.Item>
                            <ListGroup.Item className="py-1">{`Status: ${this.state.popupGroupStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.popupGroupShowName && this.state.popupGroupShowState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`Name: ${this.state.popupGroupName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`State: ${this.state.popupGroupState}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.popupGroupShowName && this.state.popupGroupShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`Name: ${this.state.popupGroupName}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Status: ${this.state.popupGroupStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.popupGroupShowState && this.state.popupGroupShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`State: ${this.state.popupGroupState}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Status: ${this.state.popupGroupStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.popupGroupShowName) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Name: ${this.state.popupGroupName}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.popupGroupShowState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`State: ${this.state.popupGroupState}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.popupGroupShowStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Status: ${this.state.popupGroupStatus}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else {
            this.setState({caption: ''}, this.setImage);
        }
    }

    nameSwitch = () => {
        if (this.state.popupGroupShowName === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.popupGroupID}-ShowName`}
                    name="popupGroupShowName"
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
                    id={`${this.props.popupGroupID}-ShowName`}
                    name="popupGroupShowName"
                    label="Show name?"
                    onChange={this.switchHandler}
                    custom
                />
            );
        }
    }

    stateSwitch = () => {
        if (this.state.popupGroupShowState === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.popupGroupID}-ShowState`}
                    name="popupGroupShowState"
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
                    id={`${this.props.popupGroupID}-ShowState`}
                    name="popupGroupShowState"
                    label="Show state?"
                    onChange={this.switchHandler}
                    custom
                />
            );
        }
    }

    statusSwitch = () => {
        if (this.state.popupGroupShowStatus === true) {
            return (
                <Form.Check
                    type="switch"
                    id={`${this.props.popupGroupID}-ShowStatus`}
                    name="popupGroupShowStatus"
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
                    id={`${this.props.popupGroupID}-ShowStatus`}
                    name="popupGroupShowStatus"
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
                    id={this.props.popupGroupID}
                    ref={this.figureRef}
                    onMouseOver={this.summary}
                    onDoubleClick={this.detailedStatus}
                    onContextMenu={this.control}
                >
                    <Figure.Image
                        ref={this.figureImageRef}
                        height={50}
                        alt={`${this.state.popupGroupName} ${this.state.popupGroupState}`}
                        src={this.state.popupGroupImage}
                    />
                    {this.state.caption}
                </Figure>
                <Overlay
                    target={this.figureRef}
                    show={this.state.popupGroupShowSummary}
                    placement="right"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`${this.state.popupGroupName} Summary`}
                            </Popover.Title>
                            <Popover.Content>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>{`State: ${this.state.popupGroupState}`}</ListGroup.Item>
                                    <ListGroup.Item>{`Status: ${this.state.popupGroupStatus}`}</ListGroup.Item>
                                </ListGroup>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureRef}
                    show={this.state.popupGroupShowDetailedStatus}
                    placement="bottom"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`${this.state.popupGroupName} Detailed Status`}
                            </Popover.Title>
                            <Popover.Content>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>{`State: ${this.state.popupGroupState}`}</ListGroup.Item>
                                    <ListGroup.Item>{`Status: ${this.state.popupGroupStatus}`}</ListGroup.Item>
                                </ListGroup>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
                <Overlay
                    target={this.figureRef}
                    show={this.state.popupGroupShowControl}
                    placement="right"
                >
                    {(props) => (
                        <Popover {...props}>
                            <Popover.Title as="h3">
                                {`Control ${this.state.popupGroupName}`}
                            </Popover.Title>
                            <Popover.Content>
                                <Form>
                                    <Form.Group controlId={`${this.props.popupGroupID}-Name`}>
                                        <Form.Label>Change Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="popupGroupName"
                                            placeholder={this.state.popupGroupName}
                                            onChange={this.changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={`${this.props.popupGroupID}-State`}>
                                        <Form.Label>Change State</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="popupGroupState"
                                            custom
                                            onChange={this.changeHandler}
                                        >
                                            <option>Down</option>
                                            <option>Up</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId={`${this.props.popupGroupID}-Status`}>
                                        <Form.Label>Change Status</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="popupGroupStatus"
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

export default Popups;