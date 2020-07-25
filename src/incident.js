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
    3.2.1.10 Incidents

    3.2.1.10.1 An icon shall be selected during detailed design to represent active incidents.
    3.2.1.10.2 The incident icon shall be configurable to display the state of the incident.
    3.2.1.10.3 When the operator moves the mouse over an incident icon a text window shall be displayed showing a summary of the incident state. The details of the summary state display will be defined in the GUI design document.
    3.2.1.10.4 The operator shall be able to activate a detailed incident state window for the selected incident by double left clicking on the icon. This action shall cause a circle to be displayed over the incident icon for as long as the detailed device status window is displayed for that incident.
    3.2.1.10.5 The operator shall be able to activate an edit window for the selected incident by right clicking on the icon. This action shall cause a circle to be displayed over the incident icon for as long as the edit window is displayed for that incident.
*/

class Incident extends Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'Incident';
        let state = 'Waiting for Tow';

        // Override defaults based on props
        if (this.props.hasOwnProperty('name')) {
            name = this.props.name;
        }

        if (this.props.hasOwnProperty('state')) {
            state = this.props.state;
        }

        // Create references
        this.figureRef = React.createRef();
        this.figureImageRef = React.createRef();
        
        // Set state
        this.state = {
            ...this.state,
            name: name,
            state: state,
            image: "/Images/gate-green.svg"
        }
    }

    // Set which image to display
    setImage = () => {
        if (this.state.state === 'Clear') {
            // Open road image
            this.setState({image: "/Images/gate-green.svg"});
        } else if (this.state.state === 'Waiting for Tow') {
            // Tow truck image
            this.setState({image: "/Images/gate-yellow.svg"});
        } else if (this.state.state === 'New') {
            // Car crash image
            this.setState({image: "/Images/gate-red.svg"});
        } else {
            // Question mark for "Unknown"
            this.setState({image: "/Images/gate-gray.svg"});
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
                                        'Clear',
                                        'Waiting for Tow',
                                        'New',
                                        'Unknown'
                                    ])}
                                    {helper.addSwitch(this.props.componentID, this, 'showName', 'Show name?')}
                                    {helper.addSwitch(this.props.componentID, this, 'showState', 'Show state?')}
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

export default Incident;