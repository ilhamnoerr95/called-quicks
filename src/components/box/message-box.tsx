import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// queries
import { useQuery } from '@tanstack/react-query';
import { getNotif } from '@/Queries/index';

// components
const NotifMessage = dynamic(() => import('@/Components/card/notif'));
const MessageSection = dynamic(() => import('@/Components/card/message'));

// type
import type { NotifData } from '@/Types/msg.type';

// global state
import { useMessage } from '@/Stores/index';

const MessageComponents: React.FC<{ wrapperRef: any }> = (props) => {
    const [dataNotif, setNotif] = useState<NotifData[] | []>([]);
    // GLOBAL STATE
    const messageOpen = useMessage((state) => state.messageOpen);

    const notif = useQuery({ ...getNotif() });

    useEffect(() => {
        setNotif(notif?.data?.data?.slice(0, 4));
    }, [notif?.data]);

    return (
        <div
            className="box-message"
            ref={props.wrapperRef}
            style={{
                width: '734px',
                height: '734px',
            }}
        >
            <div style={{ height: 'inherit' }}>
                {messageOpen ? (
                    <MessageSection />
                ) : (
                    <NotifMessage
                        dataNotif={dataNotif}
                        isLoading={notif.isLoading}
                    />
                )}
            </div>
        </div>
    );
};

export default MessageComponents;
