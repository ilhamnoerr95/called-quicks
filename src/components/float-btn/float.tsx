import Image from 'next/image';
import type { SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';

// antd
import { Button, Popover, Select } from 'antd';
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';

// components
const NotifComponents = dynamic(() => import('@/Components/box/message-box'));
const TodoComponents = dynamic(() => import('@/Components/box/todo-box'));

// HOOKS
import { useOutside } from '@/Hooks/outisdeClick';

// global state
import { useMessage } from '@/Stores/index';

const FloatButton: React.FC<{
    setOpen: SetStateAction<any>;
    slideOpen: string;
}> = (props) => {
    const [todo, setTodo] = useState<string>('');
    const [msg, setMsg] = useState<string>('');

    // HOOKES
    const wrapperRef = useRef(null);
    useOutside(wrapperRef, setMsg, setTodo);

    // GLOBAL STATE
    const messageOpen = useMessage((state) => state.messageOpen);
    const setMessage = useMessage((state) => state.updateMessage);
    const messageName = useMessage((state) => state.messageName);

    console.log(
        'render float sub PARENTS',
        useMessage((state) => state),
    );

    // trigger slide on
    const clickBtn = () => {
        props.setOpen(props.slideOpen ? '' : 'slide-on');
    };

    // trigger messagge open
    const popBtn = (params: string) => {
        if (params === 'msg-open') {
            setMsg(msg ? '' : params);
            setTodo('');
        } else {
            setTodo(todo ? '' : params);
            setMsg('');
        }
    };

    //onchange select
    const handleChange = () => {};

    return (
        <div className="floating-container">
            {/*  BUTTON THUNDER  */}
            <div className="floating-button" onClick={clickBtn}>
                <Image
                    src="/images/thunder.svg"
                    width={30}
                    height={30}
                    alt="thunder"
                />
            </div>

            <div ref={wrapperRef} className="element-container">
                {/* TODO-LIST */}
                <Popover
                    content={<TodoComponents wrapperRef={wrapperRef} />}
                    style={{ position: 'relative' }}
                    title={
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingTop: '0.5rem',
                            }}
                        >
                            <Select
                                style={{
                                    marginLeft: '4rem',
                                }}
                                placeholder="My Tasks"
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'personal',
                                        label: 'Personal Errands',
                                    },
                                    { value: 'urgent', label: 'Urgent To-Do' },
                                ]}
                            ></Select>
                            <Button type="primary">New Task</Button>
                        </div>
                    }
                    trigger="click"
                >
                    <span
                        className={`float-element ${props.slideOpen} ${todo}`}
                        onClick={() => popBtn('todo-open')}
                    >
                        <Image
                            src={
                                todo === 'todo-open'
                                    ? '/images/icon/action/chrome_reader_mode_24px-1.svg'
                                    : '/images/icon/action/chrome_reader_mode_24px.svg'
                            }
                            width={30}
                            height={30}
                            alt="reader"
                        />
                    </span>
                </Popover>

                {/* MESSAGE */}
                <Popover
                    content={<NotifComponents wrapperRef={wrapperRef} />}
                    style={{ position: 'relative' }}
                    title={
                        messageOpen ? (
                            <>
                                <div className="header-msg-container row">
                                    <div
                                        className="col-1 middle"
                                        onClick={() =>
                                            setMessage({
                                                messageOpen: !messageOpen,
                                            })
                                        }
                                    >
                                        <ArrowLeftOutlined
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '20px',
                                            }}
                                        />
                                    </div>
                                    <div className="col-10 ">
                                        <h3
                                            className="primary-0"
                                            style={{ fontSize: '20px' }}
                                        >
                                            {messageName}
                                        </h3>
                                        <p>5 participants</p>
                                    </div>
                                    <div className="col-1 middle">
                                        <CloseOutlined
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '20px',
                                            }}
                                        />
                                    </div>
                                </div>
                                <hr className=" my-md" />
                            </>
                        ) : (
                            <div className="search-container my-sm">
                                <input type="text" name="search" />
                                <span className="placeholder text-md">
                                    Search
                                </span>
                            </div>
                        )
                    }
                    trigger="click"
                >
                    <span
                        className={`float-element ${props.slideOpen} ${msg}`}
                        onClick={() => popBtn('msg-open')}
                    >
                        <Image
                            src={
                                msg === 'msg-open'
                                    ? '/images/icon/action/question_answer_24px-1.svg'
                                    : '/images/icon/action/question_answer_24px.svg'
                            }
                            width={30}
                            height={30}
                            alt="thunder"
                        />
                    </span>
                </Popover>
            </div>

            <style>
                {`
                .ant-popover .ant-popover-content{
                    margin-right: 34px;
                }
            
                `}
            </style>
        </div>
    );
};

export default FloatButton;
