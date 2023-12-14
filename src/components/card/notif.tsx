import React from 'react';

// Type
import type { NotifData } from '@/Types/msg.type';
import Image from 'next/image';

// global state
import { useMessage } from '@/Stores/index';

//componetns
import Loading from '@/Components/loading';

const name = ['genji', 'kudasai', 'hora', 'maymunah'];
const date = [
    'January 1,2021 19:10',
    '01/06/2021 12:19',
    '02/06/2021 10:45',
    '01/06/2021 12:19',
];

const CardMessage: React.FC<{ dataNotif: NotifData[]; isLoading: boolean }> = (
    props,
) => {
    const setMessage = useMessage((state) => state.updateMessage);
    const messageOpen = useMessage((state) => state.messageOpen);

    return props.isLoading ? (
        <Loading />
    ) : (
        props.dataNotif &&
            props.dataNotif.map((data: NotifData, index: number, row) => (
                <>
                    <div
                        className="card-container-msg row"
                        key={data.id}
                        onClick={() =>
                            setMessage({
                                messageOpen: !messageOpen,
                                messageId: data.id,
                                messageName: data.title,
                            })
                        }
                    >
                        <div className="col-1 icon-container">
                            <div className="icon-notif shadow">
                                <Image
                                    src={'/images/black_person.svg'}
                                    width={18}
                                    height={18}
                                    style={{ lineHeight: '12px' }}
                                    alt="thunder"
                                />
                            </div>
                            <div className="icon-notif primary">
                                <Image
                                    src={'/images/person_24px.svg'}
                                    width={18}
                                    height={18}
                                    style={{ lineHeight: '12px' }}
                                    alt="thunder"
                                />
                            </div>
                        </div>
                        <div className="col-11">
                            <div className="row pl-sm">
                                <span className="text-lg col-8 primary-0">
                                    {data.title}
                                </span>
                                <span className="text-md col-4">
                                    {date[index]}
                                </span>
                            </div>
                            <p className="text-bold row pl-sm">
                                {name[index]}:
                            </p>
                            <div
                                className="row row pl-sm"
                                style={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div className="col-8">
                                    <p>
                                        {data.body.length > 70
                                            ? data.body.substring(0, 70) + '...'
                                            : data.body}
                                    </p>
                                </div>
                                {index === 0 && <div className="dot "></div>}
                            </div>
                        </div>
                    </div>
                    {index + 1 === row.length ? (
                        ''
                    ) : (
                        <hr style={{ margin: '2rem 0 1rem' }} />
                    )}
                </>
            ))
    );
};

export default CardMessage;
