import React from 'react';

/*
    3.2.1.8 FCU and DCU/MCU

    3.2.1.8.1 Icons shall be selected during detailed design to represent the FCUs and the DCU/MCUs.
    3.2.1.8.2 The FCU icon and the DCU/MCU icon shall be configurable to show the name of the site with the icon.
    3.2.1.8.3 The icons shall be configurable to show the status of the equipment at the site. The color of the icons shall be changed to show the status of the equipment.
    3.2.1.8.4 When the operator moves the mouse over an FCU or DCU/MCU icon a text window shall be displayed showing a summary of the site status. The details of the status display will be defined in the GUI design document.
    3.2.1.8.5 The operator shall be able to activate a detailed device status window for the selected site by double left clicking on the icon. This action shall cause a circle to be displayed over the icon for as long as the detailed device status window is displayed for that site.
*/

/*
NEEDS-
    Popover for fcu summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
Props-
    fcuName: String,
    fcuShowName: [true, false],
    fcuStatus: [operational, no communication, failed],
    fcuShowStatus: [true, false]
*/
class FCU extends React.Component {
    constructor(props) {
        super(props);
    }
}

export default FCU;