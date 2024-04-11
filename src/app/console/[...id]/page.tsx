"use client"
import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

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
  const list = [
    new plants(30, '다육이'),
    new plants(40, '케일'),
    new plants(65, '상추'),
    new plants(75, '토마토')
  ]
  return <div>
    {popup && <Popup setPopup={setPopup} list={list} initNum={2} />}
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
            <span>{20}˚C</span>
          </div>
          <div className='node'>
            <p>공기중 습도</p>
            <span>{20}%</span>
          </div>
          <div className='node'>
            <p>땅속 습도</p>
            <span>{20}%</span>
          </div>
          <div className='buttons'>
            <button>목표 {20}%</button>
            <button className='set_target' onClick={() => setPopup(true)}>목표 설정</button>
          </div>
        </div>
        <div className='second'>
          <div className='img'>
            <img src='https://i.pinimg.com/originals/80/2a/62/802a62c6515f83bdee0e8f0ef1a7c68c.jpg' alt='no camera' />
          </div>
          <div className='nodes'>
            <div className='node'>
              <p>남은 물</p>
              <span>{'매우 충분'}</span>
            </div>
            <div className='node'>
              <p>생장등 조절</p>
              <button onClick={() => setLight((e: boolean) => !e)}>{light ? 'on' : 'off'}</button>
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

function Popup({ setPopup, list, initNum }) {
  const [num, setNum] = useState<plants | number | string>(initNum);
  const [percent, setPercent] = useState<number>(0);
  const Setting = async () => {
    if (num === 'input') {
      if (percent < 30 || percent > 90) {
        alert("적정 수치에 맞지 않습니다.");
        return
      }
    }
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
        {num === 'input' && <input type='number' onChange={(e: ChangeEvent<HTMLInputElement>) => setPercent(+e.target.value)} min={0} max={80} placeholder='%단위' />}
      </div>
    </div>
  </>
}