"use client"
import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';
import { useState } from 'react';

export default function Console({ params }) {
  const { id } = params;
  const [light, setLight] = useState(true);
  const [popup, setPopup] = useState(false);
  function objects(per, profer) {
    return {
      per: per,
      profer: profer
    }
  }
  const list = [
    new objects(30, '다육이'),
    new objects(40, '케일'),
    new objects(65, '상추'),
    new objects(75, '토마토')
  ]
  return <div>
    {popup && <Popup setPopup={setPopup} list={list} />}
    <Nav />
    <main>
      <div>
        <Link href={'/console'}>
          <h3 >
            뒤로가기
          </h3>
        </Link>
        <h1>
          타임랩스<br />
          #{id}
        </h1>
      </div>
      <div className="contents">
        {/* <div className='flexs'>
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
            <button className='set_target' onClick={e => setPopup(true)}>목표 설정</button>
          </div>
        </div> */}
        <div className='second'>
          대충 여기서 적을 거임
          {/* <div className='img'>
            <img src='https://i.pinimg.com/originals/80/2a/62/802a62c6515f83bdee0e8f0ef1a7c68c.jpg' alt='no camera' />
          </div>
          <div className='nodes'>
            <div className='node'>
              <p>남은 물</p>
              <span>{'매우 충분'}</span>
            </div>
            <div className='node'>
              <p>생장등 조절</p>
              <button onClick={e => setLight(e => !e)}>{light ? 'on' : 'off'}</button>
            </div>
          </div> */}
        </div>
      </div>
    </main >
  </div >
}

function Popup({ setPopup, list }) {
  const [num, setNum] = useState(-1);
  return <>
    <div className="popup" onClick={e => setPopup(false)}>
    </div>
    <div className="popupcontent">
      <h2 onClick={e => setPopup(false)}>
        나가기
      </h2>
      <div className="submits">
        {list.map((i, n) =>
          <div key={n} className={`option ${num === i && 'choose'}`} onClick={e => setNum(i)}>
            <div>
              {i.per}%
            </div>
            <div>
              추천: {i.profer}
            </div>
          </div>
        )}
        <div className={`option ${num === 'input' && 'choose'}`} onClick={e => setNum('input')}>
          <div>
            직접선택하기
          </div>
        </div>
      </div>
      <div className='column'>
        <button onClick={e => e}>설정</button>
        {num === 'input' && <input type='number' min={0} max={80} placeholder='%단위' />}
      </div>
    </div>
  </>
}