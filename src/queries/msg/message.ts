// import { useInfiniteQuery } from '@tanstack/react-query';

// helpers
import { objetToQueryString } from '@/Helpers/queryString';

// types
import { Qkeys } from '@/Types/key.types';

export const GetDataMessage = () => ({
    queryKey: [Qkeys.GET_MESSAGES],
    queryFn: async ({ pageParam = 1 }) => {
        const queryParams = objetToQueryString({ page: pageParam });
        const response = await fetch('/api/msg/getComments?' + queryParams);
        return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (_: any, pages: any) => {
        const totalPage = pages[0]?.pagination.totalPage;
        if (pages.length < totalPage) {
            return pages.length + 1;
        }
    },
});

export default GetDataMessage;
