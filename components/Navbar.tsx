import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import logo from "../assets/images/logo_flat_transparent.png";

const Navbar = () => {
  const user = null;

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
          <div>Logged In</div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => console.log(res)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
