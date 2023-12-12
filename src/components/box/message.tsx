import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNotif } from '@/Queries/index';

// components
import Loading from '@/Components/loading';
import CarMessage from '@/Components/card/message';

// type
import type { NotifData } from '@/Types/msg.type';

const MessageComponents: React.FC<{ wrapperRef: any }> = (props) => {
    const [dataNotif, setNotif] = useState<NotifData[] | []>([]);
    const [seeMesg, setSeeMsg] = useState<boolean>(false);

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
            {notif.isLoading ? (
                <Loading />
            ) : (
                <div style={{ height: 'inherit' }} className="px-lg">
                    <CarMessage dataNotif={dataNotif} />
                </div>
            )}
        </div>
    );
};

export default MessageComponents;
