import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const LoginModal = () => {
  const VITE_URL = import.meta.env.VITE_URL || "http://localhost:5000";

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  // onsubmit interactions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${VITE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    if (response.ok) {
      const json = await response.json();
      if (json.success) {
        const authToken = json.authToken;
        localStorage.setItem("token", authToken);
        toast.success("Logged In Successfully");
        navigate("/");
      } else {
        toast.error("Invalid Details");
      }
    } else {
      toast.error("HTTP Error");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 h-screen">
        {/* Modal Overlay, Background of the Modal */}
        <div className="modal-overlay left-0 right-0 bottom-0 fixed top-0 cursor-default  bg-opacity-40 bg-gray-700"></div>

        {/* Login Modal */}
        <div className="Login-modal w-[30rem] h-96 fixed right-[15rem] top-28 bg-gray-800 cursor-default rounded-xl">
          <form onSubmit={handleSubmit}>
            {/* Close Button */}

            {/* Go Home on clicking Close Button */}
            <div
              className="close-btn text-white bg-gray-700 rounded-full  w-6 h-6 ml-[28rem] mt-4  flex justify-center items-center hover:bg-gray-800 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faXmark} size="sm" />
            </div>

            <div className="Login ">
              <div className="w-full">
                <h1 className="text-4xl flex justify-center text-blue-400">
                  Log In
                </h1>
              </div>

              <div className="inline-block  text-white ml-20">
                <div className="bg-gray-700  mt-10 h-12 w-80 rounded-lg  outline-none">
                  <input
                    className="bg-transparent h-full w-full pl-4 text-lg outline-none text-center"
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" Enter Your Email"
                    autoComplete="current-email"
                    value={credentials.email}
                    onChange={onChange}
                  />
                </div>
                <div className="bg-gray-700  mt-4 h-12 w-80 rounded-lg  outline-none">
                  <input
                    className="bg-transparent h-full w-full pl-4 text-lg outline-none text-center"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={credentials.password}
                    onChange={onChange}
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button className="login w-20 h-[2.6rem] bg-blue-800 text-white font-medium flex justify-center items-center text-sm rounded-xl ml-52 my-6 cursor-pointer hover:bg-blue-600">
              Log In
            </button>
          </form>

          {/* Sign Up Route */}
          <div className="flex justify-center text-white">
            Don't have an account{" "}
            <div className="ml-2 ">
              <Link to="/signup">
                <p className="text-blue-500 cursor-pointer hover:text-blue-400">
                  Sign Up
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
