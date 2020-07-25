import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Component from './component';
import * as helper from './helper';

/*
    3.2.1.7 Loop Detectors

    3.2.1.7.1 An icon shall be selected during detailed design to indicate a loop detector.
    3.2.1.7.2 An icon shall be selected during detailed design to indicate a group of loop detectors.
    3.2.1.7.3 The loop detector and group detector icons shall use color to indicate either speed, volume, or occupancy is within a specified range or if no data is available from the detector or from all loop detectors in a group.
    3.2.1.7.4 The color used to indicate a range shall be configurable.
    3.2.1.7.5 The data being displayed by color shall be configurable.
    3.2.1.7.6 The range being displayed by a color shall be configurable.
    3.2.1.7.7 The operator shall be able to configure the color, the range and/or the data type without restarting the application.
    3.2.1.7.8 The loop detector icon shall be configurable to display the name of the loop detector.
    3.2.1.7.9 The loop detector icon shall be configurable to display the N second volume, speed and occupancy values as text associated with the icon. The value on N shall be configurable.
    3.2.1.7.10 The group detector icon shall be configurable to display the name of the detector group name as text with the icon.
    3.2.1.7.11 The group detector icon shall be configurable to display the N second average of volume, speed and occupancy for all detectors in the group as text with the icon. The value of N shall be configurable.
    3.2.1.7.12 The detector loop icon shall be configurable to display the status of the loop detector or group of loop detectors.
    3.2.1.7.13 When the operator moves the mouse over a detector loop icon a text window shall be displayed showing a summary of the status of the loop detector or the group of detector loops. The details of the status display will be defined in the GUI design document.
    3.2.1.7.14 The operator shall be able to activate a detailed device status window for the loop or group of loops by double left clicking on the selected icon. A circle shall be displayed over the icon as long as the detailed device status window for that icon.
*/

class LoopDetector extends Component {
    constructor(props) {
        super(props);

        // Set of available images
        this.images = {
            'Red': '/Images/loop-detector-red.svg',
            'Yellow': '/Images/loop-detector-yellow.svg',
            'Green': '/Images/loop-detector-green.svg',
            'Gray': '/Images/loop-detector-gray.svg'
        }

        // Set of available images for group
        this.groupImages = {
            'Red': '/Images/gate-red.svg',
            'Yellow': '/Images/gate-yellow.svg',
            'Green': '/Images/gate-green.svg'
        }

        // Set defaults
        let group = false;
        let name;
        if (group) {
            name = 'Group Detector';
        } else {
            name = 'Loop Detector';
        }
        let status = 'Operational';
        let colorData = 'Speed';
        let n = 1;
        let rangeLow = 3;
        let rangeHigh = 7;
        let lowColor = 'Red';
        let midColor = 'Yellow';
        let highColor = 'Green';
        let speed = 0;
        let volume = 11;
        let occupancy = 0;
        let showSpeed = false;
        let showVolume = false;
        let showOccupancy = false;

        // Override defaults based on props
        if (this.props.hasOwnProperty('group')) {
            group = this.props.group;
        }

        if (this.props.hasOwnProperty('name')) {
            name = this.props.name;
        }

        if (this.props.hasOwnProperty('status')) {
            status = this.props.status;
        }

        if (this.props.hasOwnProperty('colorData')) {
            colorData = this.props.colorData;
        }

        if (this.props.hasOwnProperty('n')) {
            n = this.props.n;
        }

        if (this.props.hasOwnProperty('rangeLow')) {
            rangeLow = this.props.rangeLow;
        }

        if (this.props.hasOwnProperty('rangeHigh')) {
            rangeHigh = this.props.rangeHigh;
        }

        if (this.props.hasOwnProperty('lowColor')) {
            lowColor = this.props.lowColor;
        }

        if (this.props.hasOwnProperty('midColor')) {
            midColor = this.props.midColor;
        }

        if (this.props.hasOwnProperty('highColor')) {
            highColor = this.props.highColor;
        }

        if (this.props.hasOwnProperty('speed')) {
            speed = this.props.speed;
        }

        if (this.props.hasOwnProperty('volume')) {
            volume = this.props.volume;
        }

        if (this.props.hasOwnProperty('occupancy')) {
            occupancy = this.props.occupancy;
        }

        if (this.props.hasOwnProperty('showSpeed')) {
            showSpeed = this.props.showSpeed;
        }

        if (this.props.hasOwnProperty('showVolume')) {
            showVolume = this.props.showVolume;
        }

        if (this.props.hasOwnProperty('showOccupancy')) {
            showOccupancy = this.props.showOccupancy;
        }

        // Create references
        this.figureRef = React.createRef();
        this.figureImageRef = React.createRef();
        
        // Set state
        this.state = {
            ...this.state,
            group: group,
            name: name,
            status: status,
            colorData: colorData,
            n: n,
            rangeLow: rangeLow,
            rangeHigh: rangeHigh,
            lowColor: lowColor,
            midColor: midColor,
            highColor: highColor,
            speed: speed,
            volume: volume,
            occupancy: occupancy,
            showSpeed: showSpeed,
            showVolume: showVolume,
            showOccupancy: showOccupancy,
            image: "/Images/gate-green.svg"
        }
    }

    // Get the number for whatever is being actively tracked by color
    getActiveMetricValue = () => {
        if (this.state.colorData === 'Speed') {
            return this.state.speed;
        } else if (this.state.colorData === 'Volume') {
            return this.state.volume;
        } else {
            return this.state.occupancy;
        }
    }

    // Adds persistent-display text below component
    setCaption = () => {
        let showList = new Array();

        if (this.state.showName) {
            showList.push(
                <ListGroup.Item className="py-1">{`Name: ${this.state.name}`}</ListGroup.Item>
            )
        }

        if (this.state.showStatus) {
            showList.push(
                <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
            )
        }

        if (this.state.showSpeed) {
            if (this.state.group) {
                showList.push(
                    <ListGroup.Item className="py-1">{`${this.state.n}s Avg Speed: ${this.state.speed}mph`}</ListGroup.Item>
                )
            } else {
                showList.push(
                    <ListGroup.Item className="py-1">{`${this.state.n}s Speed: ${this.state.speed}mph`}</ListGroup.Item>
                )
            }
        }

        if (this.state.showVolume) {
            if (this.state.group) {
                showList.push(
                    <ListGroup.Item className="py-1">{`${this.state.n}s Avg Volume: ${this.state.volume}gal`}</ListGroup.Item>
                )
            } else {
                showList.push(
                    <ListGroup.Item className="py-1">{`${this.state.n}s Volume: ${this.state.volume}gal`}</ListGroup.Item>
                )
            }
        }

        if (this.state.showOccupancy) {
            if (this.state.group) {
                showList.push(
                    <ListGroup.Item className="py-1">{`${this.state.n}s Avg Occupancy: ${this.state.occupancy} Persons`}</ListGroup.Item>
                )
            } else {
                showList.push(
                    <ListGroup.Item className="py-1">{`${this.state.n}s Occupancy: ${this.state.occupancy} Persons`}</ListGroup.Item>
                )
            }
        }

        this.setState({
            caption:
                <Figure.Caption>
                    <ListGroup>
                        {showList}
                    </ListGroup>
                </Figure.Caption>
        }, this.setImage);
    }

    // Set which image to display
    setImage = () => {
        // Get current value of whatever is the active metric
        let value = this.getActiveMetricValue();

        // One set of images for group, another for individual
        if (this.state.group) {
            // Compare active metric to ranges
            if (value <= this.state.rangeLow) {
                // Value is "low", so get the path to the image of the color specified by state.lowColor
                this.setState({image: this.groupImages[this.state.lowColor]});
            } else if (value >= this.state.rangeHigh) {
                // Value is "high", so get the path to the image of the color specified by state.highColor
                this.setState({image: this.groupImages[this.state.highColor]});
            } else {
                // If the value isn't high or low... it's mid, so set accordingly
                this.setState({image: this.groupImages[this.state.midColor]});
            }
        } else {
            // Compare active metric to ranges
            if (value <= this.state.rangeLow) {
                // Value is "low", so get the path to the image of the color specified by state.lowColor
                this.setState({image: this.images[this.state.lowColor]});
            } else if (value >= this.state.rangeHigh) {
                // Value is "high", so get the path to the image of the color specified by state.highColor
                this.setState({image: this.images[this.state.highColor]});
            } else {
                // If the value isn't high or low... it's mid, so set accordingly
                this.setState({image: this.images[this.state.midColor]});
            }
        }
    }

    // Handle the need to output differently for group
    detailedOutput = () => {
        if (this.state.group) {
            return (
                <ListGroup variant="flush">
                    <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                    <ListGroup.Item className="py-1">{`${this.state.n}s Avg Speed: ${this.state.speed}mph`}</ListGroup.Item>
                    <ListGroup.Item className="py-1">{`${this.state.n}s Avg Volume: ${this.state.volume}gal`}</ListGroup.Item>
                    <ListGroup.Item className="py-1">{`${this.state.n}s Avg Occupancy: ${this.state.occupancy} Persons`}</ListGroup.Item>
                </ListGroup>
            );
        } else {
            return (
                <ListGroup variant="flush">
                    <ListGroup.Item className="py-1">{`Status: ${this.state.status}`}</ListGroup.Item>
                    <ListGroup.Item className="py-1">{`${this.state.n}s Speed: ${this.state.speed}mph`}</ListGroup.Item>
                    <ListGroup.Item className="py-1">{`${this.state.n}s Volume: ${this.state.volume}gal`}</ListGroup.Item>
                    <ListGroup.Item className="py-1">{`${this.state.n}s Occupancy: ${this.state.occupancy} Persons`}</ListGroup.Item>
                </ListGroup>
            );
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
                                {this.detailedOutput()}
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
                                    <Accordion>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                    Basic Configuration
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    {helper.addText(this.props.componentID, this, 'name', 'Change Name', this.state.name)}
                                                    {helper.addSwitch(this.props.componentID, this, 'group', 'Is this a group?')}
                                                    <br />
                                                    {helper.addSelect(this.props.componentID, this, 'status', 'Change Status', [
                                                        'Operational',
                                                        'Failed',
                                                        'No Data'
                                                    ])}
                                                    {helper.addSelect(this.props.componentID, this, 'colorData', 'Change Data Displayed by Icon', [
                                                        'Speed',
                                                        'Volume',
                                                        'Occupancy'
                                                    ])}
                                                    {helper.addSwitch(this.props.componentID, this, 'showName', 'Show name?')}
                                                    {helper.addSwitch(this.props.componentID, this, 'showStatus', 'Show status?')}
                                                    {helper.addSwitch(this.props.componentID, this, 'showSpeed', 'Show speed?')}
                                                    {helper.addSwitch(this.props.componentID, this, 'showVolume', 'Show volume?')}
                                                    {helper.addSwitch(this.props.componentID, this, 'showOccupancy', 'Show occupancy?')}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                    Configure Range Values
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>
                                                    {helper.addText(this.props.componentID, this, 'rangeLow', 'Set Lower Range', this.state.rangeLow)}
                                                    {helper.addText(this.props.componentID, this, 'rangeHigh', 'Set Upper Range', this.state.rangeHigh)}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                                    Configure Range Colors
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body>
                                                    {helper.addSelect(this.props.componentID, this, 'lowColor', 'Low Color', [
                                                        'Green',
                                                        'Yellow',
                                                        'Red'
                                                    ])}
                                                    {helper.addSelect(this.props.componentID, this, 'midColor', 'Mid Color', [
                                                        'Green',
                                                        'Yellow',
                                                        'Red'
                                                    ])}
                                                    {helper.addSelect(this.props.componentID, this, 'highColor', 'High Color', [
                                                        'Green',
                                                        'Yellow',
                                                        'Red'
                                                    ])}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                                    Configure Interval
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="3">
                                                <Card.Body>
                                                    {helper.addText(this.props.componentID, this, 'n', 'Set Interval (in seconds)', this.state.n)}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                                    Set Detected Values
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="4">
                                                <Card.Body>
                                                    {helper.addText(this.props.componentID, this, 'speed', 'Set Speed (in mph)', this.state.speed)}
                                                    {helper.addText(this.props.componentID, this, 'volume', 'Set Volume (in gal)', this.state.volume)}
                                                    {helper.addText(this.props.componentID, this, 'occupancy', 'Set Occupancy (in Persons)', this.state.occupancy)}
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
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

export default LoopDetector;