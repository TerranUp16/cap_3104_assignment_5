import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import * as helper from './helper';

class Component extends React.Component {
    constructor(props) {
        super(props);

        // Set defaults
        let name = 'Component';
        let state = 'On';
        let status = 'Operational';
        let width = 64;
        let height = 64;
        let x = 0;
        let y = 0;

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

        if (this.props.hasOwnProperty('width')) {
            width = this.props.width;
        }

        if (this.props.hasOwnProperty('height')) {
            height = this.props.height;
        }

        if (this.props.hasOwnProperty('x')) {
            x = this.props.x;
        }

        if (this.props.hasOwnProperty('y')) {
            y = this.props.y;
        }

        // Create references
        this.figureRef = React.createRef();
        this.figureImageref = React.createRef();

        // Set state
        this.state = {
            width: width,
            height: height,
            x: x,
            y: y,
            name: name,
            showName: false,
            state: state,
            showState: false,
            status: status,
            showStatus: false,
            showSummary: false,
            showDetailedstatus: false,
            showControl: false,
            image: "/Images/gate-green.svg",
            caption: '',
            circle: false,
            safetyLock: false
        }
    }

    // Set which image to display
    setImage = () => {
        if (this.state.circle) {
            this.setState({image: "/Images/gate-green-circle.svg"});
        } else {
            this.setState({image: "/Images/gate-green.svg"});
        }
    }

    // Handle green circle
    greenCircle = () => {
        if (this.state.circle) {
            return (
                <img
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 1
                    }}
                    src="/Images/green_circle.png"
                    width={this.state.width}
                    height={this.state.height}
                    onMouseOver={() => helper.summary(this)}
                    onDoubleClick={() => helper.detailedStatus(this)}
                    onContextMenu={(e) => helper.control(e, this)}
                />
            )
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
                                        'On',
                                        'Off'
                                    ])}
                                    {helper.addSelect(this.props.componentID, this, 'status', 'Change Status', [
                                        'Operational',
                                        'Failed',
                                        'No Communication'
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
        )
    }
}

export default Component;