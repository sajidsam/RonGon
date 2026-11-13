import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { ShopProvider } from "./Context/ShopContext";
import HomeLayout from "./Components/layout/HomeLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <HomeLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </HomeLayout>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
