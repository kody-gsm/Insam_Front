"use client"
import Nav from "@/components/nav/nav";
import './style.scss'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Console() {
  const [editmode, setEditmode] = useState(-1)
  const [popup, setPopup] = useState<boolean>(false);
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('refreshTime')) {
      window.location.href = '/'
    }
  }
  const EditName = (id: number, text: string) => {

  }
  useEffect(() => {
    //변경 값 보내기

  }, [editmode])
  return <div>
    {popup && <Popup setPopup={setPopup} />}
    <Nav />
    <main>
      <div>
        <h3 onClick={e => {
          localStorage.clear();
          window.location.href = '/';
        }}>
          로그아웃
        </h3>
        <h1>
          화분 목록
        </h1>
        <h3 onClick={e => {
          window.location.href = '/editpw';
        }}>
          비밀번호 변경
        </h3>
      </div>
      <div className="content">
        <Pot index={0} editname={EditName} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={1} editname={EditName} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={2} editname={EditName} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={3} editname={EditName} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={4} editname={EditName} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={5} editname={EditName} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <Pot index={6} editname={EditName} link={`/console/${0}`} name={'오기'} status={true} editmode={editmode} setEditmode={setEditmode} />
        <button className="add" onClick={e => setPopup(true)}>
          +
        </button>
      </div>
    </main>
  </div>
}

function Popup({ setPopup }: { setPopup: Function }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(null)
  return <>
    <div className="popup" onClick={() => setPopup(false)}>
    </div>
    <div className="popupcontent">
      <h2 onClick={() => setPopup(false)}>
        나가기
      </h2>
      <div className="submit">
        <h3>
          화분번호를 입력해주세요.
        </h3>
        <input value={input} onChange={e => setInput(e.target.value)} />
        {error && <p className="error">연결 오류: {error}</p>}
      </div>
      <button onClick={e => setError('API is not connected.')}>연결시도하기</button>
    </div>
  </>
}

function Pot({ index, name, status, editmode, setEditmode, link, editname }) {
  const [nick, setNick] = useState('')
  useEffect(() => {
    setNick(name);
  }, []);
  return <div className="pot">
    <div className="flex">
      <Link href={link}> <div className="profile" /></Link>
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
          <path d="M35.4424 2L2.44238 35" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M43.894 11.0339L10.9639 43.964" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M8 30L16 38" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M35.5876 2.58771L43.5876 10.5877" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M2.03613 35.255L2 44" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M2 44L11 44" stroke="black" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </button>}
      {editmode === index && <button onClick={e => setEditmode(-1)}>
        <svg width="30" height="30" viewBox="0 0 69 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 20.5L27.5 41.5L66 3.5" stroke="#98DD9B" strokeWidth="8" />
        </svg>
      </button>}
    </div>
  </div>
}