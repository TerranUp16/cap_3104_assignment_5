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
    3.2.1.9 HOV End Points

    3.2.1.9.1 An icon shall represent the end point of the HOV lanes (North and South). The icon shall have different shapes to represent that the end point is closed, open Southbound or open Northbound.
    3.2.1.9.2 The end point icon shall be configurable to show the name of the end point associated with the icon.
    3.2.1.9.3 The end point icon shall be configurable to show the state of the end point associated with the icon.
    3.2.1.9.4 The end point icon shall be configurable to show the status of the end point. The color of the icon shall be changed to show the status of the end point.
    3.2.1.9.5 When the operator moves the mouse over an end point icon a text window shall be displayed showing a summary of the end point status. The details of the summary status display will be defined in the GUI design document.
    3.2.1.9.6 The operator shall be able to activate a detailed device status window for the selected end point by double left clicking on the icon. This action shall cause a circle to be displayed over the icon for as long as the detailed device status window is displayed for that end point.
*/

class HOV extends Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'HOV';
        let state = 'Open Northbound';
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
            width: this.props.width,
            height: this.props.height,
            name: name,
            state: state,
            status: status,
            image: "/Images/hov-green-north.svg"
        }
    }

    // Set which image to display
    setImage = () => {
        if (this.state.state === 'Open Northbound' && this.state.status === 'Operational') {
            // Northbound painted green
            this.setState({image: "/Images/hov-green-north.svg"});
        } else if (this.state.state === 'Open Northbound' && this.state.status === 'Failed') {
            // Northbound painted red
            this.setState({image: "/Images/hov-red-north.svg"});
        } else if (this.state.state === 'Open Northbound' && this.state.status === 'No Data') {
            // Northbound painted gray
            this.setState({image: "/Images/hov-gray-north.svg"});
        } else if (this.state.state === 'Open Southbound' && this.state.status === 'Operational') {
            // Southbound painted green
            this.setState({image: "/Images/hov-green-south.svg"});
        } else if (this.state.state === 'Open Southbound' && this.state.status === 'Failed') {
            // Southbound painted red
            this.setState({image: "/Images/hov-red-south.svg"});
        } else if (this.state.state === 'Open Southbound' && this.state.status === 'No Data') {
            // Southbound painted gray
            this.setState({image: "/Images/hov-gray-south.svg"});
        } else if (this.state.state === 'Closed' && this.state.status === 'Operational') {
            // Closed painted green
            this.setState({image: "/Images/hov-green-closed.svg"});
        } else if (this.state.state === 'Closed' && this.state.status === 'Failed') {
            // Closed painted red
            this.setState({image: "/Images/hov-red-closed.svg"});
        } else if (this.state.state === 'Closed' && this.state.status === 'No Data') {
            // Closed painted gray
            this.setState({image: "/Images/hov-gray-closed.svg"});
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
                                        'Open Northbound',
                                        'Open Southbound',
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

HOV.defaultProps = {
    width: 96,
    height: 96
}

export default HOV;