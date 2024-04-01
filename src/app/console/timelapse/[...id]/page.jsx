"use client"
import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';
import { useState } from 'react';

export default function Console({ params }) {
  const { id } = params;
  const [list, setList] = useState([{
    time: '2024-05-02 12:30:40',
    img: ''
  }])
  const [index, setIndex] = useState(0)
  return <div>
    <Nav />
    <main>
      <div>
        <Link href={`/console/${id}`}>
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
        <div className='second'>
          <p>{'2024-05-01'} ~ {'2024-05-31'}</p>
          <div className='nodes'>
            <div className='between'>
              <div className='node'>
                <p>{list[index]['time']}</p>
                <img src={list[index]['img']} />
              </div>
            </div>
          </div>
        </div>
      </div >
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