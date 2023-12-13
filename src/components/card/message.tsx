import React from 'react';

//componetns
import Loading from '@/Components/loading';
import Divider from '@/Components/divider';

// queries
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetDataMessage } from '@/Queries/index';
import { Popover } from 'antd';

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
        <>
            <div
                className="box-message"
                style={{
                    overflowY: 'scroll',
                    position: 'relative',
                }}
            >
                <div className="inbox-container-msg px-sm">
                    {message.map((data: any, index: number) => (
                        <>
                            <div
                                key={index}
                                className={
                                    data.name === 'me'
                                        ? `right-msg`
                                        : 'left-msg'
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
                                            data.name === 'me'
                                                ? `right`
                                                : 'left'
                                        }
                                    >
                                        {/* delet atau edit */}
                                        <Popover
                                            placement="bottom"
                                            trigger="click"
                                            content={
                                                <div
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            border: '1px solid #BDBDBD',
                                                            padding:
                                                                '0.5rem 2rem 0.5rem 1rem',
                                                        }}
                                                        className="primary-0"
                                                    >
                                                        Edit
                                                    </div>
                                                    <div
                                                        style={{
                                                            border: '1px solid #BDBDBD',
                                                            padding:
                                                                '0.5rem 2rem 0.5rem 1rem',
                                                        }}
                                                        className="indicators-2"
                                                    >
                                                        Delete
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <div className={'opt-msg '}>
                                                ...
                                            </div>
                                        </Popover>

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

                                {/* submit */}
                            </div>
                            {/* DIVIDER */}
                            {index === 0 && (
                                <Divider
                                    color="black"
                                    text="Today Des 13 , 2023"
                                ></Divider>
                            )}
                            {index === 3 && (
                                <Divider
                                    color="red"
                                    text="New Messages"
                                ></Divider>
                            )}
                        </>
                    ))}
                    <style>
                        {`
                        .ant-popover .ant-popover-inner{
                            padding: 0;
                        }
                        `}
                    </style>
                </div>
            </div>
            {/* submit */}
            <div className="px-sm send-container" style={{ margin: '1rem 0' }}>
                <input type="text " placeholder="Type a new message" />
                <button type="submit" className="">
                    send
                </button>
            </div>
        </>
    );
};

export default MessageCards;
