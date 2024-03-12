"use client"
import Nav from "@/components/nav/nav";
import './style.scss'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Login() {
  const [editmode, setEditmode] = useState(-1)
  const [popup, setPopup] = useState('');
  useEffect(e => {
    //변경 값 보내기
  }, [editmode])
  return <div>
    {popup && <Popup setPopup={setPopup} />}
    <Nav />
    <main>
      <div>
        <h3 onClick={e => {
          window.location.href = '/';
        }}>
          로그아웃
        </h3>
        <h1>
          화분 목록
        </h1>
      </div>
      <div className="content">
        <Pot index={0} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={1} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={2} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={3} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={4} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={5} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <button className="add" onClick={e => setPopup(true)}>
          +
        </button>
      </div>
    </main>
  </div>
}

function Popup({ setPopup }) {
  const [input, setInput] = useState('')
  return <>
    <div className="popup" onClick={e => setPopup(false)}>
    </div>
    <div className="popupcontent">
      <h2 onClick={e => setPopup(false)}>
        나가기
      </h2>
      <div className="submit">
        <h3>
          화분번호를 입력해주세요.
        </h3>
        <input value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <button>연결시도하기</button>
    </div>
  </>
}

function Pot({ index, name, status, editmode, setEditmode, link }) {
  const [nick, setNick] = useState('')
  useEffect(e => {
    setNick(name);
  }, []);
  return <div className="pot">
    <div className="flex">
      <div className="profile">
      </div>
      <div className="middle">
        {editmode !== index && <Link href={link}>{nick}</Link>}
        {editmode === index && <input autoFocus onKeyDown={e => {
          if (e.code === 'Enter') {
            setEditmode(-1);
          }
        }} value={nick} onChange={e => setNick(e.target.value)} />}
        <div className="status">
          <span>{status ? 'connected' : 'disconnected'}</span>
          {!status ? <div className="red"></div> : <div className="green"></div>}
        </div>
      </div>
    </div>
    <div className="edit">
      {editmode !== index && <button onClick={e => setEditmode(index)}>
        <svg width="30" height="30" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35.4424 2L2.44238 35" stroke="black" stroke-width="3" stroke-linecap="round" />
          <path d="M43.894 11.0339L10.9639 43.964" stroke="black" stroke-width="3" stroke-linecap="round" />
          <path d="M8 30L16 38" stroke="black" stroke-width="3" stroke-linecap="round" />
          <path d="M35.5876 2.58771L43.5876 10.5877" stroke="black" stroke-width="3" stroke-linecap="round" />
          <path d="M2.03613 35.255L2 44" stroke="black" stroke-width="3" stroke-linecap="round" />
          <path d="M2 44L11 44" stroke="black" stroke-width="3" stroke-linecap="round" />
        </svg>
      </button>}
      {editmode === index && <button onClick={e => setEditmode(-1)}>
        <svg width="30" height="30" viewBox="0 0 69 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 20.5L27.5 41.5L66 3.5" stroke="#98DD9B" stroke-width="8" />
        </svg>
      </button>}
    </div>
  </div>
}