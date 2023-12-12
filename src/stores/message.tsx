import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
    messageOpen?: boolean;
    messageId?: string | number;
    messageName?: string;
};

type Action = {
    updateMessage: (params: State) => void;
};

const initialState: State = {
    messageOpen: false,
    messageId: '',
    messageName: '',
};

// Create your store, which includes both state and (optionally) actions
export const useMessage = create<State & Action>()(
    devtools(
        (set) => ({
            ...initialState,
            updateMessage: (params) =>
                set((state) => ({
                    ...state,
                    messageOpen: params.messageOpen,
                    messageId: params.messageId,
                    messageName: params.messageName,
                })),
        }),
        { name: 'message' },
    ),
);

export default useMessage;
