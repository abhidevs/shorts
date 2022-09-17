import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);

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

  return (
    <div className="flex w-full h-full">
      <div className="bg-white rounded-lg">
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
                      <p className="bg-[#F51997] text-center rounded mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
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
            {wrongFileType && (
              <p className="text-red-400 font-semibold mt-4 w-[250px]">
                Please select an appropriate video file
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
