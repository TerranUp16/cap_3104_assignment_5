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
            active: false
        };
    }

    addButton = () => {
        if (this.props.add) {
            return (
                <Button
                    variant="success"
                    block
                    active
                    onClick={(e) => this.props.toggleAdd()}
                >
                    Add Selected Component
                </Button>
            );
        } else {
            return (
                <Button
                    variant="success"
                    block
                    onClick={(e) => this.props.toggleAdd()}
                >
                    Add Selected Component
                </Button>
            );
        }
    }

    removeButton = () => {
        if (this.props.remove) {
            return (
                <Button
                    variant="danger"
                    block
                    active
                    onClick={(e) => this.props.toggleRemove()}
                >
                    Remove Component
                </Button>
            );
        } else {
            return (
                <Button
                    variant="danger"
                    block
                    onClick={(e) => this.props.toggleRemove()}
                >
                    Remove Component
                </Button>
            );
        }
    }

    openEditor = () => {
        this.setState({active: true});
    }

    closeEditor = () => {
        this.setState({active: false});
    }

    render () {
        if (this.state.active) {
            return (
                <Form>
                    <Row>
                        <Col>
                            <Form.Control
                                as="select"
                                defaultValue={this.props.selected}
                                custom
                                onChange={(e) => this.props.changeSelected(e)}
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
                            {this.removeButton()}
                        </Col>
                        <Col>
                            <Button
                                variant="dark"
                                block
                                onClick={(e) => this.closeEditor()}
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

class Highway extends React.Component {
    constructor(props) {
        super(props);

        this.componentMap = {
            'Gate': Gate,
            'Popup Group': Popups,
            'CMS': CMS,
            'CCTV': CCTV,
            'Draw Lights': DrawLights,
            'Wrong Way Lights': WrongWayLights,
            'Loop Detector': LoopDetector,
            'Group of Loop Detectors': LoopDetector,
            'FCU/DCU/MCU': FCU,
            'HOV': HOV,
            'Incident': Incident
        }

        let startingComponents = new Array();
        let firstID = this.props.firstID;

        if (this.props.startingComponents === 'Prod') {
            startingComponents = [
                <Gate componentID={1} x={530} y={325} name='Farmington Gate' removeComponent={this.removeComponent} />,
                <Gate componentID={2} x={520} y={50} name='I-84 Gate' removeComponent={this.removeComponent} />,
                <Popups componentID={3} x={528} y={900} status='Failed' removeComponent={this.removeComponent} />,
                <CMS componentID={4} x={500} y={650} status='Operational w/Errors' message='Traffic jam, slow down!' removeComponent={this.removeComponent} />,
                <CCTV componentID={5} x={522} y={1100} status='No Data' removeComponent={this.removeComponent} />,
                <DrawLights componentID={6} x={522} y={1000} state='Partially On' removeComponent={this.removeComponent} />,
                <WrongWayLights componentID={7} x={525} y={825} status='Operational w/Errors' removeComponent={this.removeComponent} />,
                <FCU componentID={8} x={525} y={1400} status='Failed' removeComponent={this.removeComponent} />,
                <HOV componentID={9} x={515} y={125} state='Open Southbound' removeComponent={this.removeComponent} />,
                <Incident componentID={10} x={535} y={1250} state='New' removeComponent={this.removeComponent} />,
                <LoopDetector componentID={11} x={530} y={550} group={true} removeComponent={this.removeComponent} />,
                <LoopDetector componentID={12} x={512} y={225} group={false} removeComponent={this.removeComponent} />
            ];
            firstID = 13;
        } else if (this.props.startingComponents === 'Test') {
            startingComponents = [
                <Incident componentID={1} x={525} y={825} state='Clear' description='Involved vehicles have been towed away, debris has been cleared, and police are working to normalize traffic flow.' removeComponent={this.removeComponent} />,
                <LoopDetector componentID={2} x={500} y={650} group={true} removeComponent={this.removeComponent} />,
                <WrongWayLights componentID={3} x={530} y={450} state='Partially On' removeComponent={this.removeComponent} />,
                <DrawLights componentID={4} x={512} y={225} name='Some Lights On Some Lights Off Draw Lights' state='Partially On' removeComponent={this.removeComponent} />,
                <Popups componentID={5} x={520} y={50} name='Some Up Some Down Popups' status='Failed' removeComponent={this.removeComponent} />
            ];
            firstID = 6;
        }

        this.divRef = React.createRef();

        this.state = {
            components: startingComponents,
            nextID: firstID,
            x: 0,
            y: 0
        }
    }

    // Add a component to the render state
    addComponent = () => {
        if (this.props.addFlag) {
            let x = this.state.x - this.props.xOffset;
            let y = this.state.y - this.divRef.current.offsetTop;

            let props = {
                componentID: this.state.nextID,
                x: x,
                y: y,
                removeComponent: this.removeComponent
            }

            if (this.props.selectedComp === 'Group of Loop Detectors') {
                props['group'] = true;
                props['name'] = 'Group of Loop Detectors';
            }

            let type = this.componentMap[this.props.selectedComp];

            let components = this.state.components;
            components.push(React.createElement(type, props));
            let nextID = this.state.nextID + 1;

            this.setState({
                components: components,
                nextID: nextID
            }, this.props.toggleAdd());
        }
    }

    // Remove a component from the render state
    removeComponent = (id) => {
        if (this.props.removeFlag) {
            let components = this.state.components;

            delete components[id-1];

            this.setState({
                components: components,
            }, this.props.toggleRemove());
        }
    }

    // Track mouse to know where to place new component
    updateMouse = (e) => {
        this.setState({
            x: e.clientX,
            y: e.clientY
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
                ref={this.divRef}
                onClick={(e) => this.addComponent()}
                onMouseMove={(e) => this.updateMouse(e)}
            >
                {this.state.components}
            </div>
        );
    }
}

Highway.defaultProps = {
    firstID: 1,
    startingComponents: new Array(),
    xOffset: 32
}

class Screen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            add: false,
            remove: false,
            selected: this.props.selected
        }
    }

    toggleAdd = () => {
        let add = !this.state.add;

        if (add) {
            this.setState({
                add: true,
                remove: false
            });
        } else {
            this.setState({
                add: false
            });
        }
    }

    toggleRemove = () => {
        let remove = !this.state.remove;

        if (remove) {
            this.setState({
                add: false,
                remove: true
            })
        } else {
            this.setState({
                remove: false
            });
        }
    }

    changeSelected = (e) => {
        this.setState({
            selected: e.target.value
        })
    }

    render() {
        return (
            <>
                <TopBar
                    add={this.state.add}
                    remove={this.state.remove}
                    selected={this.state.selected}
                    toggleAdd={this.toggleAdd}
                    toggleRemove={this.toggleRemove}
                    changeSelected={this.changeSelected}
                />
                <Highway
                    addFlag={this.state.add}
                    removeFlag={this.state.remove}
                    toggleAdd={this.toggleAdd}
                    toggleRemove={this.toggleRemove}
                    selectedComp={this.state.selected}
                    startingComponents={this.props.startingComponents}
                />
            </>
        );
    }
}

Screen.defaultProps = {
    startingComponents: '',
    selected: 'Gate'
}

// ReactDOM.render(<Screen />, document.getElementById('root'));
// ReactDOM.render(<Screen startingComponents='Prod' />, document.getElementById('root'));
ReactDOM.render(<Screen startingComponents='Test' />, document.getElementById('root'));