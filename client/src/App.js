import { useState } from "react";
import socketio from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const [target, setTarget] = useState("http://localhost:3001");

  return (
    <>
      socket connection target
      <div>
        <input onChange={(ev) => setTarget(ev.value)} value={target} />
        {socket && <div>connection state</div>}
      </div>
      <div>
        <button
          onClick={() => {
            if (socket) socket.disconnect();

            const client = socketio(`${target}/api`);
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
          socket send
        </button>
      </div>
      <button
        onClick={async () => {
          const response = await fetch("/api/home");
          const _response = await response;
          console.log(_response);
        }}
      >
        rest request
      </button>
    </>
  );
}

export default App;
