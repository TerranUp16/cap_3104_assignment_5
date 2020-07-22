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
        let width = 128;
        let height = 128;

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

        // Create references
        this.figureRef = React.createRef();
        this.figureImageref = React.createRef();

        // Set state
        this.state = {
            width: width,
            height: height,
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
            this.setState({image: "/Images/gate_circled.png"});
        } else {
            this.setState({image: "/Images/gate-green.svg"});
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
                            <ListGroup.Item className="py-2">{`Name: ${this.state.name}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`State: ${this.state.state}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showName && this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`Name: ${this.state.name}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showState && this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-2">{`State: ${this.state.state}`}</ListGroup.Item>
                            <ListGroup.Item className="py-2">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showName) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Name: ${this.state.name}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showState) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`State: ${this.state.state}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else if (this.state.showStatus) {
            this.setState({
                caption:
                    <Figure.Caption>
                        <ListGroup>
                            <ListGroup.Item className="py-3">{`Status: ${this.state.status}`}</ListGroup.Item>
                        </ListGroup>
                    </Figure.Caption>
            }, this.setImage);
        } else {
            this.setState({caption: ''}, this.setImage);
        }
    }

    render() {
        return (
            <>
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
                                    <ListGroup.Item>{`State: ${this.state.state}`}</ListGroup.Item>
                                    <ListGroup.Item>{`Status: ${this.state.status}`}</ListGroup.Item>
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
                                    <ListGroup.Item>{`State: ${this.state.state}`}</ListGroup.Item>
                                    <ListGroup.Item>{`Status: ${this.state.status}`}</ListGroup.Item>
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
            </>
        )
    }
}

export default Component;