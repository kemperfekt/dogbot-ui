import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");

    navigate("/");
  };
  return (
    <>
      <div className="navbar flex items-center justify-center">
        <button
          onClick={handleLogout}
          className="login w-20 h-[2.6rem] bg-blue-800 text-white font-medium flex justify-center items-center text-sm rounded-xl ml-52 my-6 cursor-pointer hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
