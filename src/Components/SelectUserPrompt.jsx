import { Link } from "react-router-dom";

const SelectUserPrompt = () => {
  const authToken = localStorage.getItem("token");

  return (
    <>
      <div className=" flex-col space-y-4 h-screen bg-gray-700">
        <div className=" flex justify-center items-center pt-20">
          <img
            className="h-44 w-44"
            src="./download__1_-removebg-preview.png"
            alt="Signal Logo"
          />
        </div>
        <div className=" flex justify-center">
          <h1 className="text-lg font-semibold text-white">
            Welcome to Signal
          </h1>
        </div>
        <div className="flex justify-center">
          {authToken ? (
            <h1 className="text-lg font-normal text-gray-300">
              Please select a user from the list on the left to start chatting.
            </h1>
          ) : (
            <div>
              <h1 className="text-lg font-normal text-gray-300">
                Please Log In or Sign up to start chatting.
              </h1>
              <div className="flex space-x-4 mt-8 justify-center items-center">
                <Link to="/login">
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300">
                    SignUp
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectUserPrompt;
