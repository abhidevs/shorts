import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import logo from "../assets/images/logo_flat_transparent.png";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-4">
      <Link href="/">
        <div className="w-32 flex justify-center items-center gap-1">
          <Image
            className="cursor-pointer w-full object-cover cursor-pointer"
            src={logo}
            alt="Shorts"
          />
          <h1 className="text-[#F9484F] text-[25px] font-bold cursor-pointer">
            Shorts
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
