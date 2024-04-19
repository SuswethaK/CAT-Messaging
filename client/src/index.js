import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import "./index.css";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Components/ChatProvider";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root"); // Get the container element
const root = createRoot(container); // Create a root

// Use the root.render method to render your component tree
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);


// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";

// import { ChakraProvider } from "@chakra-ui/react";
// import ChatProvider from "./Context/ChatProvider";
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(
//   <ChakraProvider>
//     <BrowserRouter>
//       <ChatProvider>
//         <App />
//       </ChatProvider>
//     </BrowserRouter>
//   </ChakraProvider>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
