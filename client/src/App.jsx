import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Complete from "./pages/Complete";
import Account from "./pages/Account";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/account/:user" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
