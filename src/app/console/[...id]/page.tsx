"use client"
import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { tokenStore } from 'store';

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
  const { access } = tokenStore(e => e);
  const [light, setLight] = useState<boolean>(true);
  const [popup, setPopup] = useState<boolean>(false);
  const [temp, setTemp] = useState<number>(20);
  const [humi, setHumi] = useState<number>(20);
  const [soil, setSoil] = useState<number>(20);
  const [water, setWater] = useState<number>(30);
  const [targetSoil, setTargetSoil] = useState<number>(30)
  const [socket, setSocket] = useState<undefined | WebSocket>();
  const [img, setImg] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const list = [
    new plants(30, '다육이'),
    new plants(40, '케일'),
    new plants(65, '상추'),
    new plants(75, '토마토')
  ]
  const SetLightFunc = () => {
    setLight((e: boolean) => !e);
    requestData(light ? 'led_off' : 'led_on');
  }
  const setTargetFunc = (target: number) => {
    setTargetSoil(target);
  }
  const wsURL = `wss://${process.env.NEXT_PUBLIC_WS_URL}/user/pot/${id}`
  const requestData = (key: 'dht' |
    'soil' | 'water' | 'cam' |
    'led_on' | 'led_off' | 'cam_stream' |
    'cam_stop' | string) => {
    if (!socket) {
      return;
    }
    let message: string = '';
    switch (key) {
      case 'dht':
        message = 's1';
        break;
      case 'soil':
        message = 's2';
        break;
      case 'water':
        message = 's3';
        break;
      case 'cam':
        message = 's4';
        break;
      case 'led_status':
        message = 's5';
        break;
      case 'led_on':
        message = 'c1:True';
        break;
      case 'led_off':
        message = 'c1:False';
        break;
      case 'cam_stream':
        message = 's4:stream';
        break;
      case 'cam_stop':
        message = 's4:stop';
        break;
      default:
        return;
    }
    socket.send(message)
  }
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onopen = () => {
      console.log("WebSocket connection opened");
      socket.send(access);
      requestData("cam_stream")
      window.addEventListener('beforeunload', () => {
        requestData('cam_stop');
        socket.close();
      });
      requestData('led_status');
      setInterval(() => {
        if (socket.readyState === socket.OPEN) {
          requestData('dht');
          requestData('soil');
          requestData('water');
        }
      }, 1000);
    };
    socket.onmessage = (event: MessageEvent) => {
      const type: string = event.data.split(':')[0];
      const data: string = event.data.split(':')[1];
      if (type === 's4' && data !== 'stop') {
        setImg(`data:image/jpg;base64,${data}`)
        return;
      }
      if (type === 's1') { //dht
        let d: string[] = data.replace(/\(/g, '').replace(/\)/g, '').split(',');
        setTemp(+d[0]);
        setHumi(+d[1]);
      }
      if (type === 's2') { //soil
        setSoil(+data);
      }
      if (type === 's3') { //water
        setWater(+data / 3);
      }
      if (type === 's5') {
        setLight(data === 'True')
      }
    };
    socket.onclose = (e: CloseEvent) => {
      console.log("WebSocket connection closed", e);
      if (e.reason === '') {
        return;
      }
      if (confirm(e.reason + "\n retry?")) {
        const websocket = new WebSocket(wsURL);
        setSocket(websocket);
      }
    };
    socket.onerror = (error: ErrorEvent) => {
      console.error("WebSocket error:", error);
    };
  }, [socket])
  useEffect(() => {
    if (!access) {
      return;
    }
    const websocket = new WebSocket(wsURL);
    setSocket(websocket);
    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close()
      }
    }
  }, [access]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
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
          {width > 768 &&
            <div className='buttons'>
              <button>목표 {targetSoil}%</button>
              <button className='set_target' onClick={() => setPopup(true)}>목표 설정</button>
            </div>}
        </div>
        {width <= 768 &&
          <div className='buttons'>
            <button>목표 {targetSoil}%</button>
            <button className='set_target' onClick={() => setPopup(true)}>목표 설정</button>
          </div>}
        <div className='seconds'>
          <div className='img'>
            <img src={img || 'https://i.pinimg.com/originals/80/2a/62/802a62c6515f83bdee0e8f0ef1a7c68c.jpg'} alt='cam' />
          </div>
          <div className='nodes'>
            <div className='node'>
              <p>남은 물</p>
              {water >= 80 && <span>매우 충분</span>}
              {80 > water && water >= 40 && <span>충분</span>}
              {40 > water && water >= 20 && <span>보통</span>}
              {20 > water && water >= 0 && <span>부족</span>}
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