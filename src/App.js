import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./components/context/AuthProvider";
import Home from "./components/Home";
import Login from "./components/registration/Login";
import Register from "./components/registration/Register";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
