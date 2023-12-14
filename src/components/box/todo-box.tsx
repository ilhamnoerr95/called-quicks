import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// queries
import { useQuery } from '@tanstack/react-query';
import { getNotif } from '@/Queries/index';

// components
const MainTodo = dynamic(() => import('@/Components/card/todo'));

// type
import type { NotifData } from '@/Types/msg.type';

const MessageComponents: React.FC<{ wrapperRef: any }> = (props) => {
    const [dataNotif, setNotif] = useState<NotifData[] | []>([]);

    const notif = useQuery({ ...getNotif() });

    useEffect(() => {
        setNotif(notif?.data?.data?.slice(0, 4));
    }, [notif?.data]);

    return (
        <div className="box-popover" ref={props.wrapperRef}>
            <div style={{ height: 'inherit' }} className="container-todo">
                <MainTodo dataNotif={dataNotif} isLoading={notif.isLoading} />
            </div>
        </div>
    );
};

export default MessageComponents;
