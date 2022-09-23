import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import logo from "../assets/images/logo_flat_transparent.png";
import { createOrGetUser } from "../utils/auth";
import useAuthStore from "../store/authStore";
import { CREATE } from "../constants/routes";

const Navbar = () => {
  const { user, addUser, removeUser } = useAuthStore();

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-4">
      <Link href="/">
        <div className="w-32 flex justify-center items-center gap-1">
          <Image
            className="cursor-pointer w-full object-cover"
            src={logo}
            alt="Shorts"
          />
          <h1 className="text-[#F9484F] text-[25px] font-bold cursor-pointer">
            Shorts
          </h1>
        </div>
      </Link>

      <div>Search</div>

      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href={`${CREATE}`}>
              <button className="border-2 px-1 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Create</span>
              </button>
            </Link>
            {user.profileImage && (
              <Link href="/">
                <>
                  <Image
                    width={35}
                    height={35}
                    className="rounded-full object-cover"
                    src={user.profileImage}
                    alt="profile image"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
