import Chatlists from "./Chatlists";
import Chatboard from "./Chatboard";
import SelectUserPrompt from "./SelectUserPrompt";

const Home = () => {
  const authToken = localStorage.getItem("token");
  return (
    <>
      {authToken ? (
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden  h-full">
          <div className="flex">
            <div className="w-[32%] ">
              <Chatlists />
            </div>
            <div className="w-[68%] ">
              <Chatboard />
            </div>
          </div>
        </div>
      ) : (
        <SelectUserPrompt />
      )}
    </>
  );
};

export default Home;
