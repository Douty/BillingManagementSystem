import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [toggle, setToggle] = useState();

  return (
    <div className="sticky z-10">
      <div className="py-6 px-10 text-xl min-w-[250px] flex justify-between lg:justify-evenly ">
        <Link to="/" className=" text-persian md:text-xl">
          SolarGrid
        </Link>
        <div className="flex gap-8 text-lg cursor-pointer text-persian max-md:hidden ">
          <Link to="/">Home</Link>
          
          <Link to="/Login">Residential</Link>
          <Link to="/Login">Business</Link>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-6 h-6 md:hidden"
          onClick={() => {
            toggle ? setToggle(false) : setToggle(true);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </div>
      <div
        className={`${
          toggle ? "show" : "hidden"
        } flex flex-col text-lg text-white absolute bg-royal w-full items-center  gap-10 z-10 p-5 `}
      >
        <Link to="/">Home</Link>
        <Link to="/Login">Residential</Link>
        <Link to="/Login">Business</Link>
        
      </div>
    </div>
  );
};

export default NavBar;
