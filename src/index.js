import React from 'react';
import ReactDOM from 'react-dom';
import Gate from './gate.js';
import Popups from './popups.js';
import CMS from './cms.js';
import Component from './component.js';

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
            </div>
        );
    }
}

ReactDOM.render(<Highway />, document.getElementById('root'));