import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useConversation from "../../zustand store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchComponent = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation(); // Corrected the typo
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search item must be at least 3 characters long!!!");
    }
    const conversation = conversations.find(
      (c) => c.name.toLowerCase().includes(search.toLowerCase()) // Added return statement
    );
    if (conversation) {
      setSelectedConversation(conversation._id); // Use _id to set the selected conversation
      setSearch("");
    } else {
      toast.error("No User Found!!!");
    }
  };

  return (
    <>
      {/* Search Bar */}
      <form
        className="search flex justify-center mx-4 h-9 rounded-lg
          border-2 border-solid border-gray-700 selection:bg-blue-500 selection:text-white"
        onSubmit={handleSubmit}
      >
        <div className="search-icon w-8 flex items-center justify-center bg-[#24252549] rounded-l-lg text-white">
          <FontAwesomeIcon className="pl-3" icon={faMagnifyingGlass} />
        </div>
        <input
          className="w-full rounded-r-lg bg-[#2425256c] text-white outline-none px-2"
          placeholder="Search "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </form>
    </>
  );
};

export default SearchComponent;
