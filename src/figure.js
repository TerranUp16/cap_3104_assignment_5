import React from 'react';
import Figure from 'react-bootstrap/esm/Figure';

class ComponentFigure extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Figure
                id={this.props.component.props.componentID}
                ref={this.props.figureRef}
                onMouseOver={this.props.component.state.summary}
                onDoubleClick={this.props.component.state.detailedStatus}
                onContextMenu={this.props.component.state.control}
            >
                <Figure.Image
                    ref={this.props.figureImageRef}
                    alt={`${this.props.component.state.name} ${this.props.component.state.state}`}
                    width={128}
                    height={128}
                    src={this.props.component.state.image}
                />
                {this.props.component.state.caption}
            </Figure>
        )
    }
}

export default ComponentFigure;