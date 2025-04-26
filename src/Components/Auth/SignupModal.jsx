import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignupModal = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  let navigate = useNavigate();
  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // onsubmit interactions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const host = import.meta.env.VITE_URL;

    const { name, email, password, gender } = credentials;
    // checking credentials

    if (name.length < 3) {
      toast.error("Name should be atleast 3 characters long");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (password.length < 5) {
      toast.error("Password should be atleast 5 characters long");
      return;
    }
    if (!gender) {
      toast.error("Please select a gender");
      return;
    }
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        gender,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      toast.success("Account Created Successfully");
      navigate("/");
    } else {
      toast.error("Please Enter valid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Modal Overlay, Background of the Modal */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 h-screen ">
        <div className="modal-overlay left-0 right-0 bottom-0 fixed top-0 cursor-default  bg-opacity-40"></div>

        {/* Sign Up Modal */}

        <div
          className="signup-modal
 w-[30rem] h-[32rem] fixed right-[15rem] top-16 bg-gray-800 cursor-default rounded-xl

        
        
         "
        >
          <form onSubmit={handleSubmit}>
            {/* Close Button */}

            <div
              className="close-btn text-white bg-gray-700 rounded-full  w-6 h-6 ml-[28rem] mt-4  flex justify-center items-center hover:bg-gray-800 cursor-pointer
              "
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </div>

            <div className="signup ">
              <div className="w-full">
                <h1 className="text-4xl flex justify-center text-blue-400">
                  Create Account
                </h1>
              </div>

              <div className="  text-white mx-20 ">
                {/* Name */}
                <div className="bg-gray-700  mt-10 h-12 w-80 rounded-lg  outline-none">
                  <input
                    className="bg-transparent h-full w-full pl-4 text-lg outline-none text-center"
                    type="name"
                    id="name"
                    name="name"
                    placeholder="Choose Your Username"
                    autoComplete="current-username"
                    value={credentials.name}
                    onChange={onChange}
                  />
                </div>
                {/* Email */}

                <div className="bg-gray-700  mt-4 h-12 w-80 rounded-lg  outline-none">
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
                {/* Password */}
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
                {/* Select Gender */}

                <div className="bg-transparent mt-4 h-12 w-80 rounded-lg outline-none flex items-center justify-center">
                  <div className="text-white flex justify-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={onChange}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={onChange}
                        className="mr-2"
                      />
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Up Button */}
            <button className="signup-btn w-20 h-[2.6rem] bg-blue-800 text-white font-medium flex justify-center items-center text-sm rounded-xl ml-52 my-6 cursor-pointer hover:bg-blue-600">
              Sign Up
            </button>
          </form>

          {/* Login Route */}
          <div className="flex justify-center text-white">
            Already have an account{" "}
            <div className="ml-2 ">
              <Link to="/login">
                <p className="text-blue-500 cursor-pointer hover:text-blue-400">
                  Log In
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
