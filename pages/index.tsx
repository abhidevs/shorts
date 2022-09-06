import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Shorts</title>
        <meta name="description" content="shorter, crisp, and better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold underline">
        Welcome to Shorts
      </h1>
    </div>
  )
}

export default Home
