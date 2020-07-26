import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const selectedOption = (curValue, optionValue) => {
    if (curValue === optionValue) {
        return (
            <option selected>{optionValue}</option>
        )
    } else {
        return (
            <option>{optionValue}</option>
        )
    }
}

export const changeHandler = (event, component) => {
    let nam = event.target.name;
    let val = event.target.value;
    component.setState({[nam]: val}, component.setCaption);
}

export const switchHandler = (event, component) => {
    let nam = event.target.name;
    let newState = !component.state[nam];

    if (nam === 'safetyLock'){
        component.setState({
            [nam]: newState,
            showControl: false,
            circle: false
        }, component.setImage);
    } else {
        component.setState({[nam]: newState}, component.setCaption);
    }
}

export const summary = (component) => {
    if (!component.state.circle) {
        let show = !component.state.showSummary;

        component.setState({
            showSummary: show
        });
    }
}

export const detailedStatus = (component) => {
    let show = !component.state.showDetailedStatus;
    let showSummary = component.state.showSummary;

    if (show) {
        showSummary = false;
    }

    let circle = show || component.state.showControl;

    component.setState({
        showSummary: showSummary,
        showDetailedStatus: show,
        circle: circle
    }, component.setImage);
}

export const control = (event, component) => {
    event.preventDefault();

    let show = !component.state.showControl;

    let showSummary = component.state.showSummary;

    if (show) {
        showSummary = false;
    }

    let circle = show || component.state.showDetailedStatus;

    component.setState({
        showSummary: showSummary,
        showControl: show,
        circle: circle
    }, component.setImage);
}

export const addText = (id, component, name, label, placeholder) => {
    return (
        <Form.Group controlId={`${id}-${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="text"
                name={name}
                placeholder={placeholder}
                onChange={(e) => changeHandler(e, component)}
            />
        </Form.Group>
    )
}

export const addDescription = (id, component, name, label, placeholder) => {
    return (
        <Form.Group controlId={`${id}-${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="textarea"
                rows="3"
                name={name}
                placeholder={placeholder}
                onChange={(e) => changeHandler(e, component)}
            />
        </Form.Group>
    )
}

export const addSelect = (id, component, name, label, options) => {
    if (name === 'state' && component.state.safetyLock) {
        return (
            <Form.Group controlId={`${id}-${name}`}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    as="select"
                    name={name}
                    custom
                    defaultValue={component.state[name]}
                    disabled
                >
                    {options.map((opt) => (
                        <option>{opt}</option>
                    ))}
                </Form.Control>
            </Form.Group>
        );
    } else {
        return (
            <Form.Group controlId={`${id}-${name}`}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    as="select"
                    name={name}
                    custom
                    defaultValue={component.state[name]}
                    onChange={(e) => changeHandler(e, component)}
                >
                    {options.map((opt) => (
                        <option>{opt}</option>
                    ))}
                </Form.Control>
            </Form.Group>
        );
    }
}

export const addSwitch = (id, component, name, label) => {
    if (component.state[name] === true) {
        return (
            <Form.Check
                type="switch"
                id={`${id}-${name}`}
                name={name}
                label={label}
                onChange={(e) => switchHandler(e, component)}
                custom
                checked
            />
        );
    } else {
        return (
            <Form.Check
                type="switch"
                id={`${id}-${name}`}
                name={name}
                label={label}
                onChange={(e) => switchHandler(e, component)}
                custom
            />
        );
    }
}

export const addOkayButton = (component) => {
    return (
        <Button
            variant="primary"
            block
            onClick={(e) => control(e, component)}
            style={{
                marginTop: 1 + 'em'
            }}
        >
            Close
        </Button>
    )
}

export const addCloseButton = (component) => {
    return (
        <Button
            variant="primary"
            block
            size="sm"
            onClick={(e) => detailedStatus(component)}
            style={{
                marginTop: 1 + 'em'
            }}
        >
            Close
        </Button>
    )
}