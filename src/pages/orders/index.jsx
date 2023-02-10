import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Panzabi.com</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia illum
        dolor vero earum sint eaque praesentium ratione dolorem recusandae,
        accusantium impedit commodi, rem saepe, soluta voluptates quaerat ipsa
        quo doloribus.
      </main>
    </>
  );
}
