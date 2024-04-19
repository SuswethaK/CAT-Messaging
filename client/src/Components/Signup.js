import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from '@chakra-ui/react'
import { useState } from "react";
import axios from "axios";
//import { useHistory } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const toast = useToast();
  
  const handleClick = () => setShow(!show);

const submitHandler = async () => {
  if(!name || !email || !password){
    toast({
      title: "You need to fill all the details!",
      status:"warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    return;
  }
  if(password!==confirmpassword){
    toast({
      title: "Passwords do not match",
      status:"warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    return;
  }
  try{
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const {data} = await axios.post(
      "http://localhost:4000/api/user", 
    {name,email,password},
    config
  );
  toast({
      title: "Registration Successful",
      status:"success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
   // history("/chats");
    navigate({ pathname: "/chats"})
  }catch(error){
     toast({
        title: "An error occurred!",
        description: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
  }
} 
      
  return (
    <VStack spacing='5px'>
      <FormControl id="name" isRequired>
        <FormLabel >Name</FormLabel>
          <Input
            placeholder = 'Enter your Name'
            onChange={(e) => setName(e.target.value)}
          />
        
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email </FormLabel>
          <Input
            placeholder = 'Enter your Email ID'
            onChange={(e) => setEmail(e.target.value)}
          />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      
       <Button
        colorScheme = "blue"
        width = "100%"
        style={{marginTop: 15}}
        onClick={submitHandler}
      >
        Signup
      </Button> 

    </VStack>
  )
}

export default Signup;
