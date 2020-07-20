import React from 'react';

/*
    3.2.1.10 Incidents

    3.2.1.10.1 An icon shall be selected during detailed design to represent active incidents.
    3.2.1.10.2 The incident icon shall be configurable to display the state of the incident.
    3.2.1.10.3 When the operator moves the mouse over an incident icon a text window shall be displayed showing a summary of the incident state. The details of the summary state display will be defined in the GUI design document.
    3.2.1.10.4 The operator shall be able to activate a detailed incident state window for the selected incident by double left clicking on the icon. This action shall cause a circle to be displayed over the incident icon for as long as the detailed device status window is displayed for that incident.
    3.2.1.10.5 The operator shall be able to activate an edit window for the selected incident by right clicking on the icon. This action shall cause a circle to be displayed over the incident icon for as long as the edit window is displayed for that incident.
*/

/*
NEEDS-
    Popover for incident summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Edit is on right-click
Props-
    incidentState: [active, inactive]
    incidentShowState: [true, false],
*/
class Incident extends React.Component {
    constructor(props) {
        super(props);
    }
}

export default Incident;