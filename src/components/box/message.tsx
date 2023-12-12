import React from 'react';

const MessageComponents: React.FC<{ wrapperRef: any }> = (props) => {
    console.log('render');
    return (
        <div
            className="box-message"
            ref={props.wrapperRef}
            style={{
                width: '734px',
                height: '734px',
                // flexShrink: '0',
            }}
        >
            <h1>message</h1>
        </div>
    );
};

export default MessageComponents;
