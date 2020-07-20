import React from 'react';

/*
    3.2.1.6 Wrong Way Lights

    3.2.1.6.1 An icon shall be selected during detailed design to indicate a group of wrong way lights that are off.
    3.2.1.6.2 An icon shall be selected during detailed design to indicate a group of wrong way lights that are on.
    3.2.1.6.3 An icon shall be selected during detailed design to indicate a group of wrong way lights where some are on and some are off.
    3.2.1.6.4 The wrong way light icon shall be configurable to display the name of the draw lights.
    3.2.1.6.5 The wrong way light icon shall be configurable to display the state of the wrong way lights.
    3.2.1.6.6 The wrong way light icon shall be configurable to display the status of the group of wrong way lights. The color of the wrong way light icon shall represent the status of the wrong way light: green for operational, yellow for operational with errors, gray for no communications and red for failed.
    3.2.1.6.7 When the operator moves the mouse over a wrong way light icon a text window shall be displayed showing a summary of the status of the group of wrong way lights. The details of the status display will be defined in the GUI design document.
    3.2.1.6.8 The operator shall be able to activate a detailed device status window for the wrong way lights by double left clicking on the selected icon. A circle shall be displayed over the icon as long as the detailed device status window is displayed for that icon.
    3.2.1.6.9 The operator shall be able to activate the control window for the wrong way light by right clicking on the selected icon. The right click on the icon shall display a pop-up menu of available device actions from which the user may select. A circle shall be displayed over the icon as long as the device control window is displayed for that icon.
    3.2.1.6.9.1 If operation of the device is locked out for safety a command option will be “grayed out” and not selectable.
*/

/*
NEEDS-
    Popover for wrong way lights summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Control is on right-click
Props-
    wrongWayLightsGroupName: String,
    wrongWayLightsGroupShowName: [true, false],
    wrongWayLightGroupState: [on, off],
    wrongWayLightGroupShowState: [true, false],
    wrongWayLightGroupStatus: [operational, operational w/errors, no communication, failure],
    wrongWayLightGroupShowStatus: [true, false]
*/
class WrongWayLights extends React.Component {
    constructor(props) {
        super(props);
    }
}

export default WrongWayLights;