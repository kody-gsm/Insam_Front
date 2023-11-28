"use client"
import { useEffect } from 'react';
import './style.scss'

export default function Home() {
  const wsURL = "wss://port-0-websocket-1igmo82cloo8459k.sel5.cloudtype.app/ws/chat/dksl/564/"
  const websocket = new WebSocket(wsURL);
  const send = async e => {
    websocket.send(JSON.stringify({
      message: "hello There tlqkf 드디어 된단",
      msg: "there"
    }))
  }
  useEffect(e => {
    if (websocket) {
      websocket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      websocket.onmessage = (event) => {
        console.log("WebSocket message received:", event);
      };

      websocket.onclose = (e) => {
        console.log("WebSocket connection closed");
      };

      websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
  }, [])
  return (
    <main>
      hello
      <button onClick={send}>send</button>
    </main>
  )
}
