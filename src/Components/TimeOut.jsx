// src/Components/Timeout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
 // adjust path if needed

export default function TimeOut({ hours = 1 }) {
  const navigate = useNavigate();

  useEffect(() => {
    let logoutTimer;

    const handleLogout = () => {
      signOut().catch(console.error);
      navigate("/");
    };

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(handleLogout, hours * 1000);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(logoutTimer);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate, hours]);

  return null; // No UI, just behavior
}
