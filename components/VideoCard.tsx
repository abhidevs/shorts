import { NextPage } from "next";
import React from "react";
import { Video } from "../types";

interface IProps {
  video: Video;
}

const VideoCard: NextPage<IProps> = ({ video }) => {
  return <div>VideoCard</div>;
};

export default VideoCard;
