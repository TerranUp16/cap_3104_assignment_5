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

class Gate extends Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'Gate';
        let state = 'Open';
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
            image: "/Images/gate-green.svg"
        };
    }

    // Load fresh image status as soon as possible
    componentDidMount() {
        this.setImage();
    }

    // Set which image to display
    setImage = () => {
        if (this.state.state === 'Open' && !this.state.circle && this.state.status === 'Operational') {
            // Open gate painted green
            this.setState({image: "/Images/gate-green.svg"});
        } else if (this.state.state === 'Open' && this.state.circle && this.state.status === 'Operational') {
            // Open gate painted green with circle
            this.setState({image: "/Images/gate-green-circle.svg"});
        } else if (this.state.state === 'Open' && !this.state.circle && this.state.status === 'Failed') {
            // Open gate painted red
            this.setState({image: "/Images/gate-red.svg"});
        } else if (this.state.state === 'Open' && this.state.circle && this.state.status === 'Failed') {
            // Open gate painted red with circle
            this.setState({image: "/Images/gate-red-circle.svg"});
        } else if (this.state.state === 'Open' && !this.state.circle && this.state.status === 'No Data') {
            // Open gate painted gray
            this.setState({image: "/Images/gate-gray.svg"});
        } else if (this.state.state === 'Open' && this.state.circle && this.state.status === 'No Data') {
            // Open gate painted gray with circle
            this.setState({image: "/Images/gate-gray-circle.svg"});
        } else if (this.state.state === 'Partially Open' && !this.state.circle && this.state.status === 'Operational') {
            // Partially open gate painted green
            this.setState({image: "/Images/gate-green.svg"});
        } else if (this.state.state === 'Partially Open' && this.state.circle && this.state.status === 'Operational') {
            // Partially open gate painted green with circle
            this.setState({image: "/Images/gate-green-circle.svg"});
        } else if (this.state.state === 'Partially Open' && !this.state.circle && this.state.status === 'Failed') {
            // Partially open gate painted red
            this.setState({image: "/Images/gate-red.svg"});
        } else if (this.state.state === 'Partially Open' && this.state.circle && this.state.status === 'Failed') {
            // Partially open gate painted red with circle
            this.setState({image: "/Images/gate-red-circle.svg"});
        } else if (this.state.state === 'Partially Open' && !this.state.circle && this.state.status === 'No Data') {
            // Partially open gate painted gray
            this.setState({image: "/Images/gate-gray.svg"});
        } else if (this.state.state === 'Partially Open' && this.state.circle && this.state.status === 'No Data') {
            // Partially open gate painted gray with circle
            this.setState({image: "/Images/gate-gray-circle.svg"});
        } else if (this.state.state === 'Closed' && !this.state.circle && this.state.status === 'Operational') {
            // Closed gate painted green
            this.setState({image: "/Images/gate-green.svg"});
        } else if (this.state.state === 'Closed' && this.state.circle && this.state.status === 'Operational') {
            // Closed gate painted green with circle
            this.setState({image: "/Images/gate-green-circle.svg"});
        } else if (this.state.state === 'Closed' && !this.state.circle && this.state.status === 'Failed') {
            // Closed gate painted red
            this.setState({image: "/Images/gate-red.svg"});
        } else if (this.state.state === 'Closed' && this.state.circle && this.state.status === 'Failed') {
            // Closed gate painted red with circle
            this.setState({image: "/Images/gate-red-circle.svg"});
        } else if (this.state.state === 'Closed' && !this.state.circle && this.state.status === 'No Data') {
            // Closed gate painted gray
            this.setState({image: "/Images/gate-gray.svg"});
        } else if (this.state.state === 'Closed' && this.state.circle && this.state.status === 'No Data') {
            // Closed gate painted gray with circle
            this.setState({image: "/Images/gate-gray-circle.svg"});
        }
    }

    setCaption = () => {
        if (this.state.showName && this.state.showState && this.state.showStatus) {
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
                                        'Open',
                                        'Partially Open',
                                        'Closed'
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
                                </Form>
                            </Popover.Content>
                        </Popover>
                    )}
                </Overlay>
            </div>
        );
    }
}

export default Gate;