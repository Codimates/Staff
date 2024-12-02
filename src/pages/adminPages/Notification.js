import io from "socket.io-client";
import React, { useEffect, useState } from "react";

function Notification() {
  const [notifications, setNotifications] = useState([]); // To hold the notifications array
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4004");

    const email = JSON.parse(localStorage.getItem("user")).Email;
    // Send event to request notifications
    socket.emit("Registernotifyget" ,{email});

    // Listen for notifications
    socket.on("getNotifications", (data) => {
      if (data.notifications) {
        setNotifications(data.notifications); // Extract and set notifications array
      } else {
        console.error("Invalid data format:", data);
      }
    });

    // localStorage.setItem("user", JSON.stringify(userData));

    // Listen for errors
    socket.on("getNotificationsError", (err) => {
      setError(err.message);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handelviewed = (id) => {
    const socket = io("http://localhost:4004");

    const email = JSON.parse(localStorage.getItem("user")).Email;
    console.log(email, id);

    const data = { email, id };

    socket.emit("viewed", data);

    socket.on("viewedSuccess", (response) => {
      window.alert(response.message);
    });

    socket.on("viewedError", (err) => {
      console.error(err.message);
    });
  };

  return (
    <div>
      <h1>Notifications</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              {notification.message}{" "}
              <button
                className="bg-slate-500 p-2 rounded-md"
                onClick={() => handelviewed(notification._id)}
              >
                Hellow
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
}

export default Notification;
