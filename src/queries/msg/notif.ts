import { Qkeys } from '@/Types/key.types';

export const getNotif = () => ({
    queryKey: [Qkeys.GET_NOTIF],
    queryFn: async () => {
        const url = '/api/msg/getNotification';
        const response = await fetch(url, {
            method: 'get',
        });
        const result = await response.json();

        if (response.ok) {
            return result;
        }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
});

export default getNotif;
