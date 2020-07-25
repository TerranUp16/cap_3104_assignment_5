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
    3.2.1.8 FCU and DCU/MCU

    3.2.1.8.1 Icons shall be selected during detailed design to represent the FCUs and the DCU/MCUs.
    3.2.1.8.2 The FCU icon and the DCU/MCU icon shall be configurable to show the name of the site with the icon.
    3.2.1.8.3 The icons shall be configurable to show the status of the equipment at the site. The color of the icons shall be changed to show the status of the equipment.
    3.2.1.8.4 When the operator moves the mouse over an FCU or DCU/MCU icon a text window shall be displayed showing a summary of the site status. The details of the status display will be defined in the GUI design document.
    3.2.1.8.5 The operator shall be able to activate a detailed device status window for the selected site by double left clicking on the icon. This action shall cause a circle to be displayed over the icon for as long as the detailed device status window is displayed for that site.
*/

class FCU extends Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'FCU';
        let status = 'Operational';

        // Override defaults based on props
        if (this.props.hasOwnProperty('name')) {
            name = this.props.name;
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
            status: status,
            image: "/Images/gate-green.svg"
        }
    }

    // Set which image to display
    setImage = () => {
        if (this.state.status === 'Operational') {
            // FCU green for healthy
            this.setState({image: "/Images/gate-green.svg"});
        } else if (this.state.status === 'Operational w/Errors') {
            // FCU yellow for warning
            this.setState({image: "/Images/gate-yellow.svg"});
        } else if (this.state.status === 'Failed') {
            // FCU red for failed
            this.setState({image: "/Images/gate-red.svg"});
        } else {
            // FCU gray for no data/interdeterminate status
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
                                    {helper.addSelect(this.props.componentID, this, 'status', 'Change Status', [
                                        'Operational',
                                        'Operational w/Errors',
                                        'Failed',
                                        'No Data'
                                    ])}
                                    {helper.addSwitch(this.props.componentID, this, 'showName', 'Show name?')}
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

export default FCU;