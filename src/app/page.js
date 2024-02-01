"use client"
import { useEffect, useState } from 'react';
import './style.scss'

export default function Home() {
  const wsURL = "ws://192.168.1.5:8000/ws/978198712"
  const [socket, setSocket] = useState(null);
  const [img, setImg] = useState(null);
  const send = async e => {
    if (!socket) {
      return;
    }
    socket.send(JSON.stringify({
      type: 'test_message',
      message: "HELLO THERE"
    }))
  }
  useEffect(e => {
    if (!socket) {
      return;
    }
    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      console.log(event.data);
      if (JSON.parse(event.data)['type'] === 'image') {
        setImg(`data:image/png;base64,${JSON.parse(event.data)['message']}`);
      }
    };

    socket.onclose = (e) => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return e => {
      socket.close()
    }
  }, [socket])
  useEffect(e => {
    const websocket = new WebSocket(wsURL);
    setSocket(websocket);
    return e => {
      websocket.close()
    }
  }, [])
  return (
    <main>
      hello
      <button onClick={send}>send</button>
      <img src={img} alt='img' />
    </main>
  )
}
