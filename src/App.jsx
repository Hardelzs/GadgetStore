// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "@/Pages/Dashboard";
import Registerdevice from "@/Pages/Registerdevice";
import Mydevice from "@/Pages/Mydevice";
import ForgotPassword from "./Pages/ForgotPassword";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import { CheckboxReactHookFormSingle } from "./Components/CheckboxReactHookFormSingle";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          // <ProtectedRoute>
            <Dashboard />
          //  </ProtectedRoute>

        } />
        <Route path="/Registerdevice" element={
          // <ProtectedRoute>
            <Registerdevice />
          // </ProtectedRoute>
        } />

        <Route path="/Mydevice" element={
          // <ProtectedRoute>
            <Mydevice />
          // </ProtectedRoute>

        } />
        <Route path="/password" element={
          // <ProtectedRoute>
            <ForgotPassword />
          // </ProtectedRoute>

        } />
        {/* <Route path="/Omega" element={<CheckboxReactHookFormSingle />} /> */}
      </Routes>
    </Router>
  );
}


export default App