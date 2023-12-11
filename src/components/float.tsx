import Image from 'next/image';
import type { SetStateAction } from 'react';
import React from 'react';

const FloatButton: React.FC<{
    setOpen: SetStateAction<any>;
    slideOpen: string;
}> = (props) => {
    const clickBtn = () => {
        props.setOpen(props.slideOpen ? '' : 'slide-on');
        // console.log(props.slideOpen);
    };

    return (
        <div className="floating-container">
            <div className="floating-button" onClick={clickBtn}>
                <Image
                    src="/images/thunder.svg"
                    width={30}
                    height={30}
                    alt="thunder"
                />
            </div>
            <div className="element-container">
                <span className={`float-element ${props.slideOpen}`}>
                    <Image
                        src="/images/icon/action/chrome_reader_mode_24px.svg"
                        width={30}
                        height={30}
                        alt="thunder"
                    />
                </span>
                <span className={`float-element ${props.slideOpen}`}>
                    <Image
                        src="/images/icon/action/question_answer_24px.svg"
                        width={30}
                        height={30}
                        alt="thunder"
                    />
                </span>
            </div>
        </div>
    );
};

export default FloatButton;
