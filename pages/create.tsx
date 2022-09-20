import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { user }: { user: any } = useAuthStore();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/mkv", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setUploadedVideo(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handleCreate = async () => {
    if (caption && uploadedVideo?._id && category) {
      setSavingPost(true);

      const videoDocument = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: uploadedVideo._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: "postedBy",
          _ref: user?._id,
        },
        topic: category,
      };
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] lg:w-[60%] flex gap-6 flex-wrap lg:justify-between justify-center items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Create a Short</p>
            <p className="text-md text-gray-400 mt-1">
              Unleash your skills and special talent.
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {uploadedVideo ? (
                  <div>
                    <video
                      src={uploadedVideo.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-15 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-gray-300 flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Upload video</p>
                      </div>
                      <p className="text-gray-400 text-center text-sm mt-10 leading-8">
                        MP4, MKV, WebM or Ogg <br />
                        720 X 1280 or higher <br />
                        Up to 60 seconds <br />
                        Less than 250mb
                      </p>
                      <p className="bg-[#F9484F] text-center rounded mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select Video
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
          {wrongFileType && (
            <p className="text-red-400 font-semibold mt-4 w-[250px]">
              Please select an appropriate video file
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />
          <label className="text-md font-medium">Choose a Category</label>
          <select
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                value={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              type="button"
              className="border-gray-300 border-2 text-md font-medium font-medium p-2 rounded w-28 lg:w-44 outline-none"
              onClick={() => {}}
            >
              Discard
            </button>
            <button
              type="button"
              className="bg-[#F9484F] text-white text-md font-medium font-medium p-2 rounded w-28 lg:w-44 outline-none"
              onClick={handleCreate}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
