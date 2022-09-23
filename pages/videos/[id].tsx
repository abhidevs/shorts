import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { API_URL } from "../../constants/routes";

const VideoPage = () => {
  return <div>VideoPage</div>;
};

export const getServerSideProps = async ({ params: { id } }) => {
  const { data } = await axios.get(`${API_URL}/videos/${id}`);
};

export default VideoPage;
