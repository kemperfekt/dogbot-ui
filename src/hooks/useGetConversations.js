import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const VITE_URL = import.meta.env.VITE_URL || "http://localhost:5000";
  // Retrieve authToken from local storage
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const getConversations = async () => {
      // if (!authToken) {
      //   console.error("No auth token found");
      //   return;
      // }

      setLoading(true);
      try {
        const res = await fetch(`${VITE_URL}/api/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Please Log In with Valid Credentials");
        }

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
