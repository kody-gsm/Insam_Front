"use client"
import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';

class plants {
  preferSoil: number;
  name: string;
  constructor(preferSoil: number, name: string) {
    this.preferSoil = preferSoil;
    this.name = name;
  }
}

export default function Console({ params }) {
  const { id } = params;
  const [light, setLight] = useState<boolean>(true);
  const [popup, setPopup] = useState<boolean>(false);
  const [temp, setTemp] = useState<number>(20);
  const [humi, setHumi] = useState<number>(20);
  const [soil, setSoil] = useState<number>(20);
  const [water, setWater] = useState<number>(20);
  const [targetSoil, setTargetSoil] = useState<number>(30)
  const list = [
    new plants(30, '다육이'),
    new plants(40, '케일'),
    new plants(65, '상추'),
    new plants(75, '토마토')
  ]
  const SetLightFunc = () => {
    setLight((e: boolean) => !e);
  }
  const setTargetFunc = (target: number) => {
    setTargetSoil(target);
  }
  const wsURL = `ws://${process.env.NEXT_PUBLIC_WS_URL}/user/cam/${1}`
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [img, setImg] = useState<string | null>(null);
  const setTargetWater = () => {
    if (!socket) {
      return;
    }
    socket.send(JSON.stringify({
      header: {
        'Authorization': 'asdfasdf'
      },
      type: 'test_message',
      message: ''
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
      // if (JSON.parse(event.data)['type'] === 'image') {
      //   setImg(`data:image/png;base64,${JSON.parse(event.data)['message']}`);
      // }
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
  return <div>
    {popup && <Popup setPopup={setPopup} setTargetFunc={setTargetFunc} list={list} initNum={0} />}
    <Nav />
    <main>
      <div>
        <Link href={'/console'}>
          <h3>
            뒤로가기
          </h3>
        </Link>
        <h1>
          화분 현황<br />
          #{id}
        </h1>
      </div>
      <div className="contents">
        <div className='flexs'>
          <div className='node'>
            <p>공기중 온도</p>
            <span>{temp}˚C</span>
          </div>
          <div className='node'>
            <p>공기중 습도</p>
            <span>{humi}%</span>
          </div>
          <div className='node'>
            <p>땅속 습도</p>
            <span>{soil}%</span>
          </div>
          <div className='buttons'>
            <button>목표 {targetSoil}%</button>
            <button className='set_target' onClick={() => setPopup(true)}>목표 설정</button>
          </div>
        </div>
        <div className='seconds'>
          <div className='img'>
            <img src={img || 'https://i.pinimg.com/originals/80/2a/62/802a62c6515f83bdee0e8f0ef1a7c68c.jpg'} alt='no camera' />
          </div>
          <div className='nodes'>
            <div className='node'>
              <p>남은 물</p>
              {water >= 80 && <span>매우 충분</span>}
              {80 > water && water >= 60 && <span>충분</span>}
              {60 > water && water >= 40 && <span>보통</span>}
              {40 > water && water >= 20 && <span>부족</span>}
              {20 > water && water >= 0 && <span>매우 부족</span>}
            </div>
            <div className='node'>
              <p>생장등 조절</p>
              <button onClick={SetLightFunc}>{light ? 'on' : 'off'}</button>
            </div>
            <Link href={`/console/timelapse/${id}`}>
              <h3>
                타임랩스 보기
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </main >
  </div >
}

function Popup({ setPopup, list, initNum, setTargetFunc }) {
  const [num, setNum] = useState<plants | number | string>(initNum);
  const [percent, setPercent] = useState<number | string>('');
  const Setting = async () => {
    const per = percent || (num === 0 ? 30 : (num === 1 ? 40 : (num === 2 ? 65 : 75)));
    if (num === 'input') {
      if (+percent < 30 || +percent > 90) {
        alert("적정 수치에 맞지 않습니다.\n30이상 90이하로 맞춰주세요");
        return
      }
    }
    setTargetFunc(per);
    setPopup(false);
  }
  return <>
    <div className="popup" onClick={() => setPopup(false)}>
    </div>
    <div className="popupcontent">
      <h2 onClick={e => setPopup(false)}>
        나가기
      </h2>
      <div className="submits">
        {list.map((i: plants, n: number) =>
          <div key={n} className={`option ${num === n && 'choose'}`} onClick={() => setNum(n)}>
            <div>
              {i.preferSoil}%
            </div>
            <div>
              추천: {i.name}
            </div>
          </div>
        )}
        <div className={`option ${num === 'input' && 'choose'}`} onClick={() => setNum('input')}>
          <div>
            직접선택하기
          </div>
        </div>
      </div>
      <div className='column'>
        <button onClick={Setting}>설정</button>
        {num === 'input' && <input type='number' value={percent} onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPercent(+e.target.value.slice(0, 2) || '')
        }} placeholder='%단위' />}
      </div>
    </div>
  </>
}