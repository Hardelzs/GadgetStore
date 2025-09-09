import React, { useEffect, useState } from "react";

const InternetStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);

      // Check if we've already shown the online message before
      const alreadyShown = localStorage.getItem("onlineMessageShown");

      if (!alreadyShown) {
        setShowOnlineMessage(true);

        // Hide online message after 2 minutes
        setTimeout(() => {
          setShowOnlineMessage(false);
          localStorage.setItem("onlineMessageShown", "true"); // Mark as shown
        }, 2 * 60 * 1000); // 2 minutes
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineMessage(false); 
      localStorage.removeItem("onlineMessageShown"); // Reset so it shows again after reconnect
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    if (navigator.onLine) {
      handleOnline();
    } else {
      handleOffline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div
        className="z-20 fixed top-0 left-1/2 transform -translate-x-1/2 px-4 py-2"
        style={{
          color: "white",
          backgroundColor: "red",
          textAlign: "center",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        ⚠️ You are Offline, do not close this tab!
      </div>
    );
  }

  if (isOnline && showOnlineMessage) {
    return (
      <div
        className="z-20 fixed top-0 left-1/2 transform -translate-x-1/2 px-4 py-2"
        style={{
          color: "white",
          backgroundColor: "green",
          textAlign: "center",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        ✅ You are Online. If you close this tab, devices are not saved!
      </div>
    );
  }

  return null;
};

export default InternetStatus;
