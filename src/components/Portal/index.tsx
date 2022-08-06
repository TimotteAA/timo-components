import React from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
    _container?: () => React.ReactNode;
    didUpdate?: Function;
    getContainer?: Function;
}

export default class Portal extends React.Component<PortalProps> {
    //
    //
    // componentDidMount() {
    //     this.createContainer();
    // }
    //
    // componentDidUpdate(prevProps: PortalProps) {
    //     const { didUpdate } = this.props;
    //     if (didUpdate) {
    //         didUpdate(prevProps);
    //     }
    // }
    //
    // componentWillUnmount() {
    //     this.removeContainer();
    // }
    //
    // createContainer() {
    //     this._container = this.props.getContainer();
    //     this.forceUpdate();
    // }
    //
    // removeContainer() {
    //     if (this._container) {
    //         this._container.parentNode.removeChild(this._container);
    //     }
    // }
    //
    // render() {
    //     if (this._container) {
    //         return ReactDOM.createPortal(this.props.children, this._container);
    //     }
    //     return null;
    // }
}
