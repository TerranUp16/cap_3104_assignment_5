import React from 'react';

/*
    3.2.1.2 Popups

    3.2.1.2.1 An icon shall be selected during detailed design to indicate a group of popups in an “Up” or entrance closed position.
    3.2.1.2.2 An icon shall be selected during detailed design to indicate a group of popups in a “Down” or entrance opened position.
    3.2.1.2.3 An icon shall be selected during detailed design to indicate a failure status when some popups in a group are in a “Down” position and some popups in the same group are in an “Up’ position.
    3.2.1.2.4 The popup icon shall be configurable to display the name of the popup group.
    3.2.1.2.5 The popup icon shall be configurable to display the state of the popup group (up or down).
    3.2.1.2.6 The popup icon shall be configurable to display the status of the popup group. The color of the icon shall be changed to show the status of the popup group.
    3.2.1.2.7 When the operator moves the mouse over a popup icon a text window shall be displayed showing a summary of the popup group status. The details of the status display will be defined in the GUI design document.
    3.2.1.2.8 The operator shall be able to activate a detailed device status window for the selected popup group by double left clicking on the icon. A circle shall be displayed over the icon as long as the detailed status window is displayed for the icon.
    3.2.1.2.9 The operator shall be able to activate a device control window for the selected popup by right clicking on the icon. The right click on the icon shall display a pop-up menu of available device actions from which the user may select. A circle shall be displayed over the icon as long as the device control window is displayed for the icon.
    3.2.1.2.9.1 If operation of the device is locked out for safety reasons a command option will be “grayed out” and not selectable.
*/

/*
NEEDS-
    Popover for popup group summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Control is on right-click
Props-
    popupGroupName: String,
    popupGroupShowName: [true, false],
    popupGroupState: [up, down],
    popupGroupShowState: [true, false],
    popupGroupStatus: [operational, failure],
    popupGroupShowStatus: [true, false]
*/
class Popups extends React.Component {
    constructor(props) {
        super(props);
    }
}

export default Popups;