"use client"
import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';
import { useState } from 'react';

type ImgStatus = {
  time: string,
  img: string
}

export default function Console({ params }) {
  const { id } = params;
  const [list, setList] = useState<ImgStatus[]>([{
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
