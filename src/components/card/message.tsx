import React from 'react';

// import { objetToQueryString } from '@/Helpers/queryString';

//componetns
import Loading from '@/Components/loading';

// queries
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetDataMessage } from '@/Queries/index';

// types

const MessageCards = () => {
    const getMsg = useInfiniteQuery({ ...GetDataMessage() });
    const message = getMsg.data?.pages[0].data;
    console.log('render MEssage Card', message);

    //style custom
    const backgroundStyle = (param: string) => {
        const client = {
            backgroundColor: 'var(--color-chats-shade-0)',
        };
        const me = {
            backgroundColor: 'var(--color-stickers-6)',
        };

        if (param === 'me') {
            return me;
        }
        return client;
    };

    const customColorName = (param: string) => {
        if (param == 'me') {
            return 'indicators-1';
        }
        return 'chats-0';
    };

    return getMsg.isLoading ? (
        <Loading />
    ) : (
        <div
            className="box-message"
            style={{
                maxWidth: '734px',
                width: '100%',
                height: '734px',
                overflowY: 'scroll',
            }}
        >
            <div className="inbox-container-msg px-sm">
                {message.map((data: any, index: number) => (
                    <>
                        <div
                            key={index}
                            className={
                                data.name === 'me' ? `right-msg` : 'left-msg'
                            }
                        >
                            {/* nama */}
                            <div
                                className={
                                    'text-md ' + customColorName(data.name)
                                }
                            >
                                {data.name == 'me' ? 'You' : data.name}
                            </div>

                            {/* isi pesan */}
                            <div className={'container-main-msg '}>
                                <div
                                    className={
                                        data.name === 'me' ? `right` : 'left'
                                    }
                                >
                                    <div className={'opt-msg '}>...</div>

                                    <div
                                        className="point-msg text-sm"
                                        style={backgroundStyle(data.name)}
                                    >
                                        {data.msg}
                                        <br />
                                        {data.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* DIVIDER */}
                        {index === 0 && (
                            <div className={'headers-section '}>
                                <span>
                                    <p
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                        }}
                                        className="text-lg text-bold"
                                    >
                                        Today Des 13 , 2023
                                    </p>
                                </span>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default MessageCards;
