"use client"
import Nav from "@/components/nav/nav";
import './style.scss'
import Link from "next/link";
import { useEffect, useState } from "react";
import Client from "@/assets/client";
import { AxiosError, AxiosResponse } from "axios";
import { tokenStore } from "store";

interface PotInterface {
  pot_code: string,
  pot_name: string,
  pot_status?: boolean
}
export default function Console() {
  const { access } = tokenStore(e => e);
  const [editmode, setEditmode] = useState(-1)
  const [popup, setPopup] = useState<boolean>(false);
  const [potlist, setPotlist] = useState<PotInterface[]>();
  const EditName = (code: string, text: string) => {
    Client.post('/user/pot/update', {
      code: code,
      name: text
    }, { headers: { 'access_token': access } })
      .then((e: AxiosResponse) => {
        console.log(e.data)
      })
      .catch((e: AxiosError) => {
        alert(e);
      })
  }
  const getPots = () => {
    Client.get('/user/pot/read', { headers: { 'access_token': access } })
      .then((e: AxiosResponse) => {
        setPotlist(e.data);
      }).catch((e: AxiosError) => {
        alert(e.message);
      })
  }
  const delPot = (code: string) => {
    Client.post('user/pot/remove', { code: code }, { headers: { 'access_token': access } })
      .then((e: AxiosResponse) => {
        // console.log(e.data);
        getPots();
      })
      .catch((e: AxiosError) => {
        alert(e.message);
      })
  }
  useEffect(() => {
    //변경 값 보내기
    if (access && !popup) {
      getPots();
    }
  }, [editmode, access, popup])
  return <div>
    {popup && <Popup setPopup={setPopup} />}
    <Nav />
    <main>
      <div>
        <h3 onClick={e => {
          document.cookie = '';
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
        {potlist?.map((i, n) =>
          <Pot key={n}
            code={i.pot_code}
            editname={EditName}
            link={`/console/${i.pot_code}`}
            name={i.pot_name} status={i?.pot_status}
            editmode={editmode} setEditmode={setEditmode}
            delfunction={delPot}
          />
        )}
        <button className="add" onClick={e => setPopup(true)}>
          +
        </button>
      </div>
    </main>
  </div>
}

function Popup({ setPopup }: { setPopup: Function }) {
  const { access } = tokenStore(e => e);
  const [potid, setPotID] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState(null);
  const addPot = async () => {
    setError('')
    await Client.post('/user/pot/add', {
      code: potid,
      name: name
    }, { headers: { "access_token": access } }).then((e: AxiosResponse) => {
      console.log(e.data);
      setError('');
      setPopup(false);
    }).catch((e: AxiosError) => {
      console.log(e)
      setError(e.message)
    })
  }
  return <>
    <div className="popup" onClick={() => setPopup(false)}>
    </div>
    <div className="popupcontent">
      <h2 onClick={() => setPopup(false)}>
        나가기
      </h2>
      <div className="submit">
        <h3>
          화분 코드를 입력해주세요.
        </h3>
        <input value={potid} placeholder="화분 코드" onChange={e => setPotID(e.target.value)} />
        <input value={name} placeholder="별명" onChange={e => setName(e.target.value)} />
        {error && <p className="error">연결 오류: {error}</p>}
      </div>
      <button onClick={addPot}>연결시도하기</button>
    </div>
  </>
}

function Pot({ code, name, status, editmode, setEditmode, link, editname, delfunction }) {
  const [nick, setNick] = useState<string>(name);
  return <div className="pot">
    <div className="flex">
      <Link href={link}> <div className="profile" /></Link>
      <div className="middle">
        {editmode !== code && <Link href={link}>
          <h2>#{code}</h2>{nick}
        </Link>}
        {editmode === code && <>
          <h2>#{code}</h2>
          <input autoFocus onKeyDown={e => {
            if (e.code === 'Enter') {
              setEditmode(-1);
              editname(code, nick);
            }
          }} value={nick} onChange={e => setNick(e.target.value)} />
        </>
        }
        <div className="status">
          <span>{status ? 'connected' : 'disconnected'}</span>
          {!status ? <div className="red"></div> : <div className="green"></div>}
        </div>
      </div>
    </div>
    <div className="edit">
      {editmode !== code && <button onClick={e => setEditmode(code)}>
        <svg width="30" height="30" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35.4424 2L2.44238 35" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M43.894 11.0339L10.9639 43.964" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M8 30L16 38" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M35.5876 2.58771L43.5876 10.5877" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M2.03613 35.255L2 44" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M2 44L11 44" stroke="black" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </button>}
      {editmode === code && <button onClick={e => setEditmode(-1)}>
        <svg width="30" height="30" viewBox="0 0 69 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 20.5L27.5 41.5L66 3.5" stroke="#98DD9B" strokeWidth="8" />
        </svg>
      </button>}

      <button className={'del'} onClick={(e: React.MouseEvent) => {
        if (confirm("화분을 연결 해지 하시겠습니까?")) {
          delfunction(code);
        }
      }}>
        -
      </button>
    </div>
  </div>
}