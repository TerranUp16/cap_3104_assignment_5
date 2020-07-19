import React from 'react';

/*
    3.2.1.1 Gates
    The gates referred to in this section are the entrance blocking gates at both ends of the freeway.
    
    3.2.1.1.1 An icon shall be selected during detailed design to show a gate in a closed position.
    3.2.1.1.2 An icon shall be selected during detailed design to show a gate in an open position.
    3.2.1.1.3 An icon shall be selected during detailed design to show a gate in a partially open (15%) openposition.
    3.2.1.1.4 The gate icon shall be configurable to show the name of the gate with the icon.
    3.2.1.1.5 The gate icon shall be configurable to show the state of the gate (e.g., open or close).
    3.2.1.1.6 The gate icon shall be configurable to show the status of the gate (operational, failed, or no data). The color of the gate icon shall be changed to show the status of the gate.
    3.2.1.1.7 When the operator moves the mouse over a gate icon a text window shall be displayed showing asummary of the gate status.  The details of the summary status display will be defined in the GUI design document.
    3.2.1.1.8 The operator shall be able to activate a detailed device status window for the selected gate by doubleleft clicking on the icon.  This action shall cause a circle to be displayed over the gate icon for as long as the detailed device status window is displayed for that gate.
    3.2.1.1.9 The operator shall be able to activate a device control window for the selected gate by right clicking on the icon.  The right click on the icons shall display a pop-up menu of available device actions from which the user may select.  This action shall cause a circle to be displayed over the gate icon for aslong as the device control window is displayed for that gate.
    3.2.1.1.9.1 If operation of the device is locked out for safety reasons a command option will be “grayed out” and not selectable.
*/

/*
NEEDS-
    Popover for gate summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Control is on right-click
Props-
    gateName: String,
    gateShowName: [true, false],
    gateOpen: [open, partial, closed],
    gateShowState: [true, false],
    gateStatus: [operational, failed, no data],
    gateShowStatus: [true, false]
*/
class Gate extends React.Component {
    constructor(props) {
        super(props);
    }
}