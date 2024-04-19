import "./App.css";
import Homepage from "./Pages/Homepage";
import {  Route, Routes } from 'react-router-dom';

import ChatPage from "./Pages/ChatPage";
//import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
  <div className="App">
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chats" element={<ChatPage />} />
      </Routes>
      
  
    </div>

  );
}

export default App;
