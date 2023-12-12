import Image from 'next/image';
import type { SetStateAction } from 'react';
import React, { useRef, useState } from 'react';

// antd
import { Popover } from 'antd';

// components
import MessageComponents from '@/Components/box/message';

// HOOKS
import { useOutside } from '@/Hooks/outisdeClick';

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);

const FloatButton: React.FC<{
    setOpen: SetStateAction<any>;
    slideOpen: string;
}> = (props) => {
    const [todo, setTodo] = useState<string>('');
    const [msg, setMsg] = useState<string>('');

    const wrapperRef = useRef(null);
    useOutside(wrapperRef, setMsg, setTodo);

    const clickBtn = () => {
        props.setOpen(props.slideOpen ? '' : 'slide-on');
    };

    const popBtn = (params: string) => {
        if (params === 'msg-open') {
            setMsg(msg ? '' : params);
            setTodo('');
        } else {
            setTodo(todo ? '' : params);
            setMsg('');
        }
    };

    return (
        <div className="floating-container">
            {todo || msg ? (
                ''
            ) : (
                // BUTTON THUNDER
                <div className="floating-button" onClick={clickBtn}>
                    <Image
                        src="/images/thunder.svg"
                        width={30}
                        height={30}
                        alt="thunder"
                    />
                </div>
            )}

            <div ref={wrapperRef} className="element-container">
                {/* TODO-LIST */}
                <Popover content={content} title="Title" trigger="click">
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
                            alt="thunder"
                        />
                    </span>
                </Popover>

                {/* MESSAGE */}
                <Popover
                    content={<MessageComponents wrapperRef={wrapperRef} />}
                    title={
                        <div className="search-container">
                            <input type="text" name="search" />
                            <span className="placeholder text-md">Search</span>
                        </div>
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

            {/* <style jsx>{`
                // .ant-input-group-wrapper .ant-input-search .ant-input {
                //     background: white;
                // }
            `}</style> */}
        </div>
    );
};

export default FloatButton;
