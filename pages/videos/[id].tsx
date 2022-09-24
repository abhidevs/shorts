import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { API_URL } from "../../constants/routes";
import { Video } from "../../types";

interface IProps {
  video: Video;
}

const VideoPage = ({ video }: IProps) => {
  const [videoDetails, setVideoDetails] = useState(video);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playPauseVideo = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  if (!video) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-60vh">
            <video
              src={video.video.asset.url}
              ref={videoRef}
              onClick={() => {}}
              className="h-full cursor-pointer"
              loop
              controls
            ></video>
          </div>
          <div className="absolute top-[50%] left-[50%] cursor-pointer">
            {!isPlaying && (
              <button onClick={playPauseVideo}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${API_URL}/videos/${id}`);

  return {
    props: { video: data },
  };
};

export default VideoPage;
