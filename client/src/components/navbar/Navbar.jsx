import React, { useEffect, useState } from "react";
import "./navbar.css";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleNotification = (data) => {
      setNotifications((prev) => [...prev, data]);
    };

    socket.on("getNotification", handleNotification);

    return () => {
      socket.off("getNotification", handleNotification);
    };
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented on";
    } else if (type === 3) {
      action = "shared";
    } else {
      action = "disliked";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Notify</span>
      <div className="dot">
        <div className="dot-inner">
          <div className="dot-inner2"></div>
        </div>
      </div>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <IoIosNotificationsOutline className="iconImg" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
