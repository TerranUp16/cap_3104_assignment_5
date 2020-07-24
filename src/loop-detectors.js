import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Component from './component';
import * as helper from './helper';

/*
    3.2.1.7 Loop Detectors

    3.2.1.7.1 An icon shall be selected during detailed design to indicate a loop detector.
    3.2.1.7.2 An icon shall be selected during detailed design to indicate a group of loop detectors.
    3.2.1.7.3 The loop detector and group detector icons shall use color to indicate either speed, volume, or occupancy is within a specified range or if no data is available from the detector or from all loop detectors in a group.
    3.2.1.7.4 The color used to indicate a range shall be configurable.
    3.2.1.7.5 The data being displayed by color shall be configurable.
    3.2.1.7.6 The range being displayed by a color shall be configurable.
    3.2.1.7.7 The operator shall be able to configure the color, the range and/or the data type without restarting the application.
    3.2.1.7.8 The loop detector icon shall be configurable to display the name of the loop detector.
    3.2.1.7.9 The loop detector icon shall be configurable to display the N second volume, speed and occupancy values as text associated with the icon. The value on N shall be configurable.
    3.2.1.7.10 The group detector icon shall be configurable to display the name of the detector group name as text with the icon.
    3.2.1.7.11 The group detector icon shall be configurable to display the N second average of volume, speed and occupancy for all detectors in the group as text with the icon. The value of N shall be configurable.
    3.2.1.7.12 The detector loop icon shall be configurable to display the status of the loop detector or group of loop detectors.
    3.2.1.7.13 When the operator moves the mouse over a detector loop icon a text window shall be displayed showing a summary of the status of the loop detector or the group of detector loops. The details of the status display will be defined in the GUI design document.
    3.2.1.7.14 The operator shall be able to activate a detailed device status window for the loop or group of loops by double left clicking on the selected icon. A circle shall be displayed over the icon as long as the detailed device status window for that icon.
*/

/*
NEEDS-
    Popover for loop detectors summary, status, and control- https://react-bootstrap.github.io/components/overlays/#popovers
        Summary is on-hover
        "Detailed stauts" is on double-left-click
        Control is on right-click
Props-
    loopDetectorRangeColorNoData: Color,
    loopDetectorRangeColorLow: Color,
    loopDetectorRangeNumLow: Number,
    loopDetectorRangeColorMed: Color,
    loopDetectorRangeNumMed: Number,
    loopDetectorRangeColorHigh: Color,
    loopDetectorRangeNumHigh: Number,
    loopDetectorColorData: [speed, volume, occupancy],
    loopDetectorNSecond: Integer,
    loopDetectorName: String,
    loopDetectorShowName: [true, false],
    loopDetectorSpeed: Number,
    loopDetectorVolume: Number,
    loopDetectorOccupancy: Number,
    loopDetectorShowData: [true, false],
    loopDetectorStatus: [data, no data],
    loopDetectorShowStatus: [true, false],
    loopDetectIsGroup: [true, false]
*/
class LoopDetector extends React.Component {
    constructor(props) {
        super(props);
    }
}

export default LoopDetector;