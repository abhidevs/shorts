import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  console.log(videos);
  return (
    <>
      <Head>
        <title>Shorts</title>
        <meta name="description" content="shorter, crisp, and better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-10 videos h-full">
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <NoResults text="No videos found" />
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/videos`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
