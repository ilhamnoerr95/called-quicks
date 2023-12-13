import React from 'react';

const Divider: React.FC<{ color: string; text: string }> = (props) => (
    <div className={'headers-section my-md'}>
        <span className={props.color == 'red' ? 'new' : ''}>
            <p
                style={{
                    width: '100%',
                    textAlign: 'center',
                    color: props.color,
                }}
                className="text-lg text-bold"
            >
                {props.text}
            </p>
        </span>
    </div>
);

export default Divider;
