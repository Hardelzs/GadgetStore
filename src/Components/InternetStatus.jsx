import React, { useEffect, useState } from "react";

const InternetStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
    className="z-20 absolute top-0 ml-197"
      style={{
        color: "white",
        backgroundColor: isOnline ? "green" : "red",
        textAlign: "center",
        borderRadius: "8px",
        width: "200px",
        fontSize: "16px"
      }}
    >
      {isOnline ? "✅ You are Online" : "⚠️ You are Offline"}
    </div>
  );
};

export default InternetStatus;
