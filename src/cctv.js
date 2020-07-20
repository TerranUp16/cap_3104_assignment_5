import React from 'react';

/*
    3.2.1.4 CCTV Camera

    3.2.1.4.1 An icon shall be selected to indicate a CCTV camera
    3.2.1.4.2 The camera icon shall be configurable to show the name of the camera with the icon.
    3.2.1.4.3 The camera icon shall be configurable to show the state of the camera.
    3.2.1.4.4 The camera icon shall be configurable to show the status of the camera. The color of the camera icon shall be changed to show the status of the camera.
    3.2.1.4.5 When a user moves the mouse over a camera icon a text window shall be displayed showing a summary of the camera status.
    3.2.1.4.6 The user shall be able to activate a detailed device status window for the selected camera by double left clicking on the icon. This action shall cause a circle to be displayed over the camera icon for as long as the detailed device status window is displayed for that camera.
    3.2.1.4.7 The user shall be able to activate a device control window for the selected camera by right clicking on the icon. The right click on the icon shall display a pop-up menu of available device actions from which the user may select. This action shall cause a circle to be displayed over the camera icon for as long as the device control window is displayed for that camera.
*/

/*
NEEDS-
    Popover for cctv summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Control is on right-click
Props-
    cctvName: String,
    cctvShowName: [true, false],
    cctvState: [on, off],
    cctvShowState: [true, false],
    cctvStatus: [operational, no communication, failed],
    cctvShowStatus: [true, false]
*/
class CCTV extends React.Component {
    constructor(props) {
        super(props);
    }
}

export default CCTV;