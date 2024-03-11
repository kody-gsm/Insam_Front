"use client"
import { useEffect, useState } from 'react';
import './style.scss'

export default function Home() {
  const wsURL = `ws://${process.env.NEXT_PUBLIC_URL}/ws/978198712`
  const [socket, setSocket] = useState(null);
  const [input, setinput] = useState('')
  const [img, setImg] = useState(null);
  const send = async e => {
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
  useEffect(e => {
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
