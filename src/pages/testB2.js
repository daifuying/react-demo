import React,{PureComponent } from 'react';
class TestB extends PureComponent {
    render() {
        const { value } = this.props;

        return (
            <div className="rc-design-component-notice-preview">{value}</div>
        );
    }
}

export default TestB;
