import { useEffect, useState } from "react";
import "./index.css";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import { io } from "socket.io-client";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
          <div className="phone-btn"></div>
        </>
      ) : (
        <>
          <div className="accounts">
            <p>username1: emir</p>
            <p>username2: davinci</p>
          </div>
          <div className="login-container">
            <div className="login">
              <h2>Notify</h2>
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={() => setUser(username)}>Login</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
