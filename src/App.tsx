import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { createContext, useState } from "react";
import HomePage from "./components/OtherComponents/HomePage";
import Login from "./components/OtherComponents/Login";

// Context to set user authentication
export const authenticationContext = createContext<React.Dispatch<
  React.SetStateAction<string | boolean>
> | null>(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") || false
  );

  return (
    <authenticationContext.Provider value={setIsAuthenticated}>
      <Router>
        <Routes>
          {/* Public route */}
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
          />
          {/* Private route */}
          <Route
            path="/"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Router>
    </authenticationContext.Provider>
  );
}

export default App;
