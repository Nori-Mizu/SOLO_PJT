import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api");
      console.log(response);
      const data = await response.json();
      console.log(data);
      setBackendData(data);
      console.log(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchChatData() {
      const response = await fetch("/api/chat");
      const data = await response.json();
      setChatData(data);
      console.log(data);
    }
    fetchChatData();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    // メッセージと日時をサーバーに送信
    const timestamp = new Date().toISOString();
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message, timestamp }),
    })
      .then((response) => response.json())
      .then((newMessage) => {
        // 送信後に表示を更新
        setChatData([...chatData, newMessage]);
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending chat message:", error);
      });
  };

  return (
    <div>
      {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}

      {chatData.map((message, i) => (
        <div key={i}>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold" }}>Name:</span>
            <span style={{ marginLeft: "5px" }}>{message.name}</span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold" }}>Message:</span>
            <span style={{ marginLeft: "5px" }}>{message.message}</span>
          </div>
          <p>Timestamp: {message.timestamp}</p>
          <br />
        </div>
      ))}

      <div>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <br />
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Message"
        />
        <br />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
