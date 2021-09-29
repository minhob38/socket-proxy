import { useState } from "react";
import socketio from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const [serverAddr, setServerAddr] = useState("http://localhost:3001");
  const [reqAddr, setReqAddr] = useState("/api/home");

  return (
    <>
      <h4>server address</h4>
      <input onChange={(ev) => setServerAddr(ev.target.value)} value={serverAddr} />
      <hr />
      <div>localhost: http://localhost:3001</div>
      <div>without nginx: http://34.64.177.34:3001</div>
      <div>with nginx: http://34.64.177.34:8080</div>
      <hr />
      <h4>socket test</h4>
      {socket ? <div>connection : )</div> : <div>disconnection : (</div>}
      <div>
        <button
          onClick={() => {
            if (socket) socket.disconnect();

            const client = socketio(`${serverAddr}/api`);
            setSocket(client);
            client.on("send", (data) => {
              console.log(data);
              // console.log("confirmed server received client's data");
            });
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
      <hr />
      <h4>rest api test</h4>
      <div>
        <input onChange={(ev) => setReqAddr(ev.target.value)} value={reqAddr} />
      </div>
      <button
        onClick={async () => {
          const response = await fetch(`${serverAddr}${reqAddr}`);
          const _response = await response;
          console.log(_response);
        }}
      >
        request without react proxy
      </button>
      <button
        onClick={async () => {
          const response = await fetch(`${reqAddr}`);
          const _response = await response;
          console.log(_response);
        }}
      >
        request with react proxy
      </button>
    </>
  );
}

export default App;
