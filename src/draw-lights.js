import React from 'react';

/*
    3.2.1.5 Draw Lights

    3.2.1.5.1 An icon shall be selected during detailed design to indicate a group of draw lights that are off.
    3.2.1.5.2 An icon shall be selected during detailed design to indicate a group of draw lights that are on.
    3.2.1.5.3 An icon shall be selected during detailed design to indicate a group of draw lights where some are on and some are off.
    3.2.1.5.4 The draw light icon shall be configurable to display the name of the draw lights.
    3.2.1.5.5 The draw light icon shall be configurable to display the state of the draw lights.
    3.2.1.5.6 The draw light icon shall be configurable to display the status of the draw lights. The color of the draw light icon shall represent the status of the draw light: green for operational, yellow for operational with errors, gray for no communications and red for failed.
    3.2.1.5.7 When the operator moves the mouse over a draw light icon a text window shall be displayed showing a summary of the status of the group of draw lights. The details of the status display will be defined in the GUI design document.
    3.2.1.5.8 The operator shall be able to activate a detailed device status window for the draw lights by double left clicking on the selected icon. A circle shall be displayed over the icon as long as the detailed device status window is displayed for that icon.
    3.2.1.5.9 The operator shall be able to activate a device control window for the draw lights by right clicking on the selected icon. The right click on the icon shall display a pop-up menu of available device actions from which the user may select. A circle shall be displayed over the icon as long as the device control window is displayed for that icon.
    3.2.1.5.9.1 If operation of the device is locked out for safety reasons the command option will be “grayed out” and not selectable.
*/

/*
NEEDS-
    Popover for draw lights summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Control is on right-click
Props-
    drawLightsGroupName: String,
    drawLightsGroupShowName: [true, false],
    drawLightGroupState: [on, off],
    drawLightGroupShowState: [true, false],
    drawLightGroupStatus: [operational, operational w/errors, no communication, failure],
    drawLightGroupShowStatus: [true, false]
*/
class DrawLights extends React.Component {
    constructor(props) {
        super(props);
    }
}