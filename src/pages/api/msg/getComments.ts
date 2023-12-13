// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NotifData } from '@/Types/msg.type';

import { dummyData } from '@/Utils/dummy';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NotifData[] | any>,
) {
    try {
        const page = req.query.page;
        const startIndex = ((page as any) - 1) * 6;
        const endIndex = startIndex + 6;
        const totalPages = Math.ceil(dummyData.length / 6);
        const paginatedData = dummyData.slice(startIndex, endIndex);

        return res.status(200).json({
            data: paginatedData,
            meta: {
                code: 200,
                msg: 'sukses',
            },
            pagination: {
                page,
                totalPage: totalPages,
                total: dummyData.length,
            },
        });
    } catch (error: any) {
        res.status(500).json({ err: 'error' });
    }
}
