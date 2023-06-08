import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("http://localhost:3000/api");
  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //     setBackendData(data);
  //     console.log(data);
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchChatData() {
      const response = await fetch("http://localhost:3000/api/chat");
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
    fetch("http://localhost:3000/api/chat", {
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
        console.log(newMessage);
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending chat message:", error);
      });
  };

  return (
    <div>
      {/* {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )} */}
      <h1>＜EV時代を考える＞</h1>
      <h2>※マナーを守って投稿しましょう</h2>
      {chatData.map((message, i) => (
        <div key={i} style={{ display: "flex", marginBottom: "10px" }}>
          <span style={{ marginRight: "2ch" }}>名前: {message.name}</span>
          <span style={{ marginRight: "2ch" }}>
            メッセージ: {message.message}
          </span>
          <span>投稿日時: {message.created_at}</span>
        </div>
      ))}

      <div>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="ここに名前"
        />

        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="ここにメッセージ"
        />

        <button onClick={handleSend}>投稿！！</button>
      </div>
    </div>
  );
}

export default App;
