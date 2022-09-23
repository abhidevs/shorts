import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { API_URL } from "../constants/routes";
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
  try {
    const { data } = await axios.get(`${API_URL}/videos`);
    return {
      props: {
        videos: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export default Home;
