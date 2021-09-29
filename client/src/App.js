import { useState } from "react";
import socketio from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);

  return (
    <>
      {socket && <div>connection state</div>}
      <button
        onClick={() => {
          if (socket) socket.disconnect();

          const client = socketio("http://localhost:3001/api");
          setSocket(client);
          client.on("send", () => console.log("confirmed server received client's data"));
        }}
      >
        connect
      </button>
      <button
        onClick={() => {
          socket.emit("send", "my data : )");
        }}
      >
        send
      </button>
    </>
  );
}

export default App;
