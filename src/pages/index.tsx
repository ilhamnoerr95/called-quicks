import Head from 'next/head';
import { Lato } from 'next/font/google';

// components
import Navbar from '@/Components/headers/navbar';
import FloatButton from '@/Components/float-btn/float';
import { useState } from 'react';

const lato = Lato({ weight: '400', subsets: ['latin'] });

export default function Home() {
    const [slideOpen, setOpen] = useState('');

    return (
        <>
            <Head>
                <title>Called Quicks</title>
                <meta name="description" content="Called Quicks Test" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/simple-quicks.svg" />
            </Head>
            <main className={`${lato.className}`}>
                <div className="side-main"></div>
                <div className="wrapper-main">
                    <Navbar />

                    <footer>
                        <FloatButton setOpen={setOpen} slideOpen={slideOpen} />
                    </footer>
                </div>

                <style>
                    {`
                    .ant-input {
                        background:var(--color-primary-1)
                    }
                    .ant-input-prefix{
                        color: white;
                    }
                    `}
                </style>
            </main>
        </>
    );
}
