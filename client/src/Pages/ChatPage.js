import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import Chatbox from "../Components/ChatBox";
import MyChats from "../Components/MyChats";
import SideDrawer from "../Components/SideDrawer";
import { ChatState } from "../Components/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  // Determine whether to show MyChats based on screen size
  const showMyChats = useBreakpointValue({ base: false, md: true });

  return (
    <Box width="100%">
      {user && <SideDrawer />}
      <Flex justifyContent="space-between" height="91.5vh" padding="10px">
        {/* Only render MyChats if showMyChats is true */}
        {showMyChats && user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </Box>
  );
};

export default Chatpage;
