import React from 'react';

/*
    3.2.1.9 HOV End Points

    3.2.1.9.1 An icon shall represent the end point of the HOV lanes (North and South). The icon shall have different shapes to represent that the end point is closed, open Southbound or open Northbound.
    3.2.1.9.2 The end point icon shall be configurable to show the name of the end point associated with the icon.
    3.2.1.9.3 The end point icon shall be configurable to show the state of the end point associated with the icon.
    3.2.1.9.4 The end point icon shall be configurable to show the status of the end point. The color of the icon shall be changed to show the status of the end point.
    3.2.1.9.5 When the operator moves the mouse over an end point icon a text window shall be displayed showing a summary of the end point status. The details of the summary status display will be defined in the GUI design document.
    3.2.1.9.6 The operator shall be able to activate a detailed device status window for the selected end point by double left clicking on the icon. This action shall cause a circle to be displayed over the icon for as long as the detailed device status window is displayed for that end point.
*/

/*
NEEDS-
    Popover for hov summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Control is on right-click
Props-
    hovName: String,
    hovShowName: [true, false],
    hovState: [southbound, northbound, closed],
    hovShowState: [true, false],
    hovStatus: [operational, no communication, failed],
    hovShowStatus: [true, false]
*/
class HOV extends React.Component {
    constructor(props) {
        super(props);
    }
}