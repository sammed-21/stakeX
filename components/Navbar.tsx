import { NavLink } from "@/constants";
import Link from "next/link";
import React from "react";
import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  const navlink = () => {
    return NavLink.map((item, key) => (
      <Link href={item.href} key={key}>
        {item.title}
      </Link>
    ));
  };

  return (
    <div className="w-full   flex gap-3 py-3 justify-around items-center h-fit bg-brown-400">
      <div className="w-full max-w-[1300px] flex items-center justify-between bg-yellow-900 p-1 rounded-lg">
        <h1 className="text-2xl font-black">StakeX</h1>
        <div className="flex gap-10 text-lg font-semibold justify-between ">
          {navlink()}
        </div>
        <div>
          <ConnectWallet />
        </div>
      </div>
    </div>
  ); // Call the navlink function
};

export default Navbar;
