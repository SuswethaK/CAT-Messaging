import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
const ChatContext = createContext();

const ChatProvider = ({ children }) => { // Corrected typo: 'children' instead of 'childern'
  const [user, setUser] = useState();
  const [selectedChat,setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification,setNotification] = useState([]);

  const navigate = useNavigate(); // Use useNavigate here

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/"); // Use navigate function here
    }
  }, [navigate]); // Correct dependency array

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  ); // Corrected typo: 'children' instead of 'childern'
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
