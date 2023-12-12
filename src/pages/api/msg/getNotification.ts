// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NotifData } from '@/Types/msg.type';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NotifData[] | any>,
) {
    try {
        const url = process.env.NEXT_PUBLIC_API + '/posts';
        const response = await fetch(url);
        const result = await response.json();

        return res.status(200).json({ data: result });
    } catch (error: any) {
        res.status(500).json({ err: 'error' });
    }
}
