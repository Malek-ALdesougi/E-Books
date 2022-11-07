import React, { Routes, Route } from "react";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <Home />
      {/* <Routes>
        <Route path="/" element={<Home />} />
      </Routes> */}
      <Footer />
    </>
  );
}

export default App;
