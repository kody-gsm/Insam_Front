"use client"
import { useEffect, useState } from 'react';
import './style.scss'

export default function Home() {
  const wsURL = `ws://${process.env.NEXT_PUBLIC_WS_URL}/ws/978198712`
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [input, setinput] = useState<string>('')
  const [img, setImg] = useState<string | null>(null);
  const send = async () => {
    if (!socket) {
      return;
    }
    socket.send(JSON.stringify({
      header: {
        'Authorization': 'asdfasdf'
      },
      type: 'test_message',
      message: input
    }))
  }
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      if (JSON.parse(event.data)['type'] === 'image') {
        setImg(`data:image/png;base64,${JSON.parse(event.data)['message']}`);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close()
    }
  }, [socket])
  useEffect(() => {
    const websocket = new WebSocket(wsURL);
    setSocket(websocket);
    return () => {
      websocket.close()
    }
  }, [])
  return (
    <main>
      <form onSubmit={e => {
        e.preventDefault();
        setinput('');
      }}>
        <input value={input} onChange={e => setinput(e.target.value)} />
        <button onClick={send}>send</button>
      </form>
      <img src={img} alt='img' />
    </main>
  )
}
