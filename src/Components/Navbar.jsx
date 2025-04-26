import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  //Log Out Logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    navigate("/");
  };
  return (
    <>
      <FontAwesomeIcon icon={faRightToBracket} />
      <div className="navbar flex items-center p-1">
        {!localStorage.getItem("token") ? (
          <Link to="/login">
            <button className=" login w-[5rem] h-[2.6rem] bg-[#d44612] text-white  font-medium flex justify-center items-center text-sm rounded-full mx-2 cursor-pointer hover:bg-[#d44612bd]">
              Log In
            </button>
          </Link>
        ) : (
          <button
            className="btn w-[5rem] h-[2.6rem] bg-[#d44612] text-white  font-medium flex justify-center items-center text-sm rounded-full mx-2 cursor-pointer hover:bg-[#d44612bd]"
            onClick={handleLogout}
          >
            Log Out
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
