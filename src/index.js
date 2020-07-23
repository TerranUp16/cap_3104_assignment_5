import React from 'react';
import ReactDOM from 'react-dom';
import Gate from './gate';
import Popups from './popups';
import CMS from './cms';
import CCTV from './cctv';
import DrawLights from './draw-lights';
import Component from './component';

class Highway extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{
                    height: 1542,
                    backgroundImage: 'url(/Images/I-15-Map.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto'
                }}
            >
                <Gate componentID={1} x={530} y={325} name='Farmington Gate' />
                <Gate componentID={2} x={520} y={50} name='I-84 Gate' />
                <Popups componentID={3} x={528} y={900} status='Failed' />
                <CMS componentID={4} x={500} y={650} status='Operational w/Errors' message='Traffic jam, slow down!' />
                <CCTV componentID={5} x={522} y={1100} status='No Data' />
                <DrawLights componentID={6} x={522} y={1000} state='Partially On' />
            </div>
        );
    }
}

ReactDOM.render(<Highway />, document.getElementById('root'));