// Import necessary libraries and components
import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "./ChatProvider";
import React, { useEffect, useState } from "react";
import {
  IconButton,
  Spinner,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender } from "./ChatLogics";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import "./styles.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

// Define the endpoint for socket connection
const ENDPOINT = "http://localhost:4000";

// Define variables outside the component function
let socket;
let selectedChatCompare;

// Define the SingleChat component
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  // Define state variables
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const toast = useToast();

  // Get user and selectedChat from context
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
const [attachment, setAttachment] = useState(null);

  // Define function to fetch messages
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:4000/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  // Initialize socket connection
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connect", () => setSocketConnected(true));
  }, []);

  // Function to handle message sending
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      //socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:4000/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);

        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  // Fetch messages when selectedChat changes
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // console.log(notification,"---------------");
  // Handle new messages received
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  // Function to handle typing
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
const handleImageChange = (e) => {
  setAttachment(e.target.files[0]);
};


  // Render component
  return (
    <>
      {/* Conditional rendering based on selectedChat */}
      {selectedChat ? (
        <>
          {/* Chat header section */}
          <Text
            fontSize={{ base: "26px", md: "38px" }}
            pb={3}
            px={3}
            w="100%"
            fontFamily="Helvetica"
            alignItems="center"
            d="flex"
            justifyContent="space-between"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
              mr={5}
            />
            {!selectedChat.isGroupChat ? (
              <>{getSender(user, selectedChat.users)}</>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          {/* Chat messages section */}
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="auto"
          >
            {/* Loading spinner or chat messages */}
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            {/* Input field for new message */}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message here"
                onChange={typingHandler}
                value={newMessage}
              ></Input>
              <Input
                type="file"
                accept="image/"
                onChange={handleImageChange}
                ClassName="file-input"></Input>
            </FormControl>
            

          </Box>
        </>
      ) : (
        // Placeholder text when no chat is selected
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Helvetica">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

// Export the SingleChat component
export default SingleChat;
