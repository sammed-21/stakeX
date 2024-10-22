import { NavLink } from "@/constants";
import Link from "next/link";
import React from "react";
import ConnectWallet from "./ConnectWallet";
import ClaimReward from "./claimReward/ClaimReward";

const Navbar = () => {
  const navlink = () => {
    return NavLink.map((item, key) => (
      <Link href={item.href} key={key}>
        {item.title}
      </Link>
    ));
  };

  return (
    <div className="w-full flex gap-3 py-3 justify-around items-center h-fit bg-brown-400">
      <div className="w-full max-w-[1300px] flex items-center justify-between bg-gray-800 px-4 py-4 p-1 rounded-lg">
        <div className="flex gap-10 text-lg font-semibold justify-between ">
          <h1 className="text-2xl font-black">StakeX</h1>
          {navlink()}
        </div>
        <div className="flex w-fit  gap-2">
          <ClaimReward />
          <ConnectWallet />
        </div>
      </div>
    </div>
  ); // Call the navlink function
};

export default Navbar;
