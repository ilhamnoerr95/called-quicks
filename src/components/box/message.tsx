import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNotif } from '@/Queries/index';

// components
import Loading from '@/Components/loading';

const MessageComponents: React.FC<{ wrapperRef: any }> = (props) => {
    const notif = useQuery({ ...getNotif() });

    return (
        <div
            className="box-message"
            ref={props.wrapperRef}
            style={{
                width: '734px',
                height: '734px',
            }}
        >
            {notif.isLoading ? (
                <Loading />
            ) : (
                <div style={{ height: 'inherit' }}>
                    <h1>message</h1>
                </div>
            )}
        </div>
    );
};

export default MessageComponents;
