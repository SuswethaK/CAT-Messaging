import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from "@chakra-ui/react";
import Login from "../Components/Login";
import Signup from '../Components/Signup';
import { useNavigate } from 'react-router-dom';

const Homepage = ()=> {
  const navigate = useNavigate(); // Use useNavigate here
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats"); // Use navigate for redirection
  }, [navigate]); // Update the dependency array

  return (
    <Container maxW='xl' centerContent>
      {/* Box is from Chakra UI */}
      <Box
        display="flex" // More commonly used prop name for flex display
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="200px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      > 
        <Text fontSize="3xl" fontFamily="Work Sans" color="black" fontWeight="bold"> 
          Sign in to Marketplace  
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded' colorScheme='yellow'>
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
             <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage;
