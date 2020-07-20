import React from 'react';

/*
    3.2.1.3 CMS

    3.2.1.3.1 An icon shall be selected during detailed design to indicate changeable message signs.
    3.2.1.3.2 An icon shall be selected during detailed design to indicate a changeable message sign that is displaying a message.
    3.2.1.3.3 The CMS icon shall be configurable to display the name of the sign with the icon.
    3.2.1.3.4 The CMS icon shall be configurable to display an abbreviated message text with the icon.
    3.2.1.3.5 The CMS icon shall be configurable to display the status of the sign associated with the icon. The CMS icon color shall represent the operational status of the CMS sign: green for operational, yellow for operational with errors, gray for no communications and red for failed.
    3.2.1.3.6 If the operator moves the mouse over the CMS icon then a text window shall be displayed with a summary of the operational state and status of the sign and the text of any message being displayed on the sign.
    3.2.1.3.7 The operator shall be able to activate a detailed device status window for the sign by double left clicking on the selected icon. A circle shall be displayed over the icon as long as the detailed device status window is displayed for that icon.
    3.2.1.3.8 The operator shall be able to activate a device control window for the CMS sign by right clicking on the selected icon. The right click on the icon shall display a pop-up menu of available device actions from which the user may select. A circle shall be displayed over the icon as long as the device control window is displayed for that icon.
    3.2.1.3.8.1 If operation of the device is locked out for safety reasons a command option will be “grayed out” and not selectable
*/

/*
NEEDS-
    Popover for cms summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Control is on right-click
Props-
    cmsName: String,
    cmsShowName: [true, false],
    cmsMessage: String,
    cmsShowMessage: [true, false],
    cmsStatus: [operaitonal, operational w/errors, no communication, failed],
    cmsShowStatus: [true, false]
*/
class CMS extends React.Component {
    constructor(props) {
        super(props);
    }
}

export default CMS;