import React from 'react';
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Gate from './gate';
import Popups from './popups';
import CMS from './cms';
import CCTV from './cctv';
import DrawLights from './draw-lights';
import WrongWayLights from './wrong-way-lights';
import FCU from './fcu';
import HOV from './hov';
import Incident from './incident';
import LoopDetector from './loop-detectors';
import Component from './component';

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            selected: 'Gate',
            add: false,
            remove: false
        };
    }

    addButton = () => {
        if (this.state.add) {
            return (
                <Button
                    variant="success"
                    block
                    active
                >
                    Add Selected Component
                </Button>
            );
        } else {
            return (
                <Button
                    variant="success"
                    block
                >
                    Add Selected Component
                </Button>
            )
        }
    }

    openEditor = () => {
        this.setState({active: true});
    }

    render () {
        if (this.state.active) {
            return (
                <Form>
                    <Row>
                        <Col>
                            <Form.Control
                                as="select"
                                defaultValue={this.state.selected}
                                custom
                            >
                                <option>Gate</option>
                                <option>Popup Group</option>
                                <option>CMS</option>
                                <option>CCTV</option>
                                <option>Draw Lights</option>
                                <option>Wrong Way Lights</option>
                                <option>Loop Detector</option>
                                <option>Group of Loop Detectors</option>
                                <option>FCU/DCU/MCU</option>
                                <option>HOV</option>
                                <option>Incident</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            {this.addButton()}
                        </Col>
                        <Col>
                            <Button
                                variant="danger"
                                block
                            >
                                Remove Component
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="dark"
                                block
                            >
                                Close Editor
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )
        } else {
            return (
                <Button
                    variant="dark"
                    block
                    onClick={(e) => this.openEditor()}
                >
                    Add or Remove Components
                </Button>
            )
        }
    }
}

const productionComponents = [
    <Gate componentID={1} x={530} y={325} name='Farmington Gate' />,
    <Gate componentID={2} x={520} y={50} name='I-84 Gate' />,
    <Popups componentID={3} x={528} y={900} status='Failed' />,
    <CMS componentID={4} x={500} y={650} status='Operational w/Errors' message='Traffic jam, slow down!' />,
    <CCTV componentID={5} x={522} y={1100} status='No Data' />,
    <DrawLights componentID={6} x={522} y={1000} state='Partially On' />,
    <WrongWayLights componentID={7} x={525} y={825} status='Operational w/Errors' />,
    <FCU componentID={8} x={525} y={1400} status='Failed' />,
    <HOV componentID={9} x={515} y={125} state='Open Southbound' />,
    <Incident componentID={10} x={535} y={1250} state='New' />,
    <LoopDetector componentID={11} x={530} y={550} group={true} />,
    <LoopDetector componentID={12} x={512} y={225} group={false} />
];

const testComponents = [
    <Incident componentID={5} x={525} y={825} state='Clear' description='Involved vehicles have been towed away, debris has been cleared, and police are working to normalize traffic flow.' />,
    <LoopDetector componentID={4} x={500} y={650} group={true} />,
    <WrongWayLights componentID={3} x={530} y={450} state='Partially On' />,
    <DrawLights componentID={2} x={512} y={225} name='Some Lights On Some Lights Off Draw Lights' state='Partially On' />,
    <Popups componentID={1} x={520} y={50} name='Some Up Some Down Popups' status='Failed' />
];

class Highway extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            components: this.props.startingComponents,
            nextID: this.props.firstID
        }
    }

    // Load fresh starting components
    componentDidMount() {
        /*this.addComponent(Gate, {
            x: 30,
            y: 30,
            name: 'Testy Gater',
            state: 'Partially Open',
            status: 'Failed'
        });*/
    }

    // Add a gate to the render state
    addComponent = (type, props) => {
        props['componentID'] = this.state.nextID;
        let components = this.state.components;
        components.push(React.createElement(type, props));
        let nextID = this.state.nextID++;

        this.setState({
            components: components,
            nextID: nextID
        });
    }

    render() {
        return (
            <div
                style={{
                    height: 1542,
                    backgroundImage: 'url(/Images/I-15-Map.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto'
                }}
            >
                {this.state.components}
            </div>
        );
    }
}

Highway.defaultProps = {
    firstID: 1,
    startingComponents: new Array()
}

/*
ReactDOM.render(
    <>
        <TopBar />
        <Highway startingComponents={productionComponents} firstID={13} />
    </>, document.getElementById('root')
);
*/

ReactDOM.render(
    <>
        <TopBar />
        <Highway startingComponents={testComponents} firstID={6} />
    </>, document.getElementById('root')
);

/*
ReactDOM.render(
    <>
        <TopBar />
        <Highway />
    </>, document.getElementById('root')
);
*/