import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./features/auth/Login";
import { Products } from "./features/product/Product";


export const CounterContext = React.createContext(0);


function App() {
  const [count, setCount] = React.useState(0)

  return (
    <CounterContext.Provider value={{count, setCount}}>
      <div className="App"> 
        <BrowserRouter>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Login />} />
        </Routes>
        </BrowserRouter>
      </div>
    </CounterContext.Provider>
  );
}

export default App;
