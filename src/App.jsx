import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import ErrorPage from "./pages/ErrorPage/index";
import Home from "./pages/Home/index";

function App() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  function ProtectedRoute({ isAuthenticated, children }) {
    
if (!isAuthenticated) {
  navigate("/login")
}
    return children;
  }

  return (
    <>
      <Routes>
        {/* public route */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<ErrorPage />} />

        {/* protected route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
