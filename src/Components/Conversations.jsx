import React from "react";
import Navbar from "./Navbar";
import Logout from "./Auth/Logout";
import Chatboard from "./Chatboard";

const Conversations = () => {
  const authToken = localStorage.getItem("token");
  return (
    <>
      {authToken ? (
        <Chatboard />
      ) : (
        <div className=" flex-col space-y-4 h-screen ">
          <div className=" flex justify-center items-center pt-20">
            <img
              className="h-44 w-44  "
              src="./download__1_-removebg-preview.png"
              alt=""
            />
          </div>
          <div className=" flex justify-center">
            <h1 className="text-lg font-semibold text-white">
              Welcome to Signal
            </h1>
          </div>
          <div className="flex justify-center text-white">
            See <p className="text-blue-600">what's new</p> in this update
          </div>
          <div className="flex justify-center items-center bg-violet-900">
            <Logout />
          </div>
        </div>
      )}
    </>
  );
};

export default Conversations;
