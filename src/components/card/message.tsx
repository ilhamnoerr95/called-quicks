import React from 'react';

//componetns
import Loading from '@/Components/loading';

// global state

const MessageCards: React.FC<{ isLoading: boolean }> = (props) => {
    console.log('render MEssage Card');

    return props.isLoading ? (
        <Loading />
    ) : (
        <div
            className="box-message"
            style={{
                maxWidth: '734px',
                width: '100%',
                height: '734px',
            }}
        >
            <h1>MESSAGE CARDS</h1>
        </div>
    );
};

export default MessageCards;
