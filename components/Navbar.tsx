"use client";
import { NavLink } from "@/constants";
import Link from "next/link";
import React from "react";
import ConnectWallet from "./ConnectWallet";
import ClaimReward from "./claimReward/ClaimReward";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/namelogo.png";

const Navbar = () => {
  const path = usePathname();
  console.log(path);
  const navlink = () => {
    return NavLink.map((item, key) => (
      <Link className="text-sm font-medium" href={item.href} key={key}>
        {item.title}
      </Link>
    ));
  };

  return (
    <div className="w-full flex gap-3 py-3 justify-around items-center h-fit bg-brown-400">
      <div className="w-full max-w-[1100px] flex items-center justify-between  px-4 py-4 p-1 rounded-lg">
        <div className="flex gap-10 text-lg items-center font-semibold justify-between ">
          <Image
            src={logo}
            width={70}
            height={30}
            className="w-full h-full object-cover"
            alt="iamge"
          />
          {navlink()}
        </div>
        <div className="flex w-fit items-center gap-2">
          {path == "/staking" && <ClaimReward />}
          <ConnectWallet />
        </div>
      </div>
    </div>
  ); // Call the navlink function
};

export default Navbar;
