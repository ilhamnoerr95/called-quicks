import type { SetStateAction } from 'react';
import { useEffect } from 'react';

export const useOutside = (
    ref: any,
    setMsg: SetStateAction<any>,
    setTodo: SetStateAction<any>,
) => {
    useEffect(() => {
        /**
         * if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setMsg('');
                setTodo('');
            }
            console.log(ref.current);
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, setMsg, setTodo]);
};
