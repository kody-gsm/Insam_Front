"use client"
import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';
import { useState } from 'react';

class ImgStatus {
  time: string;
  img: string;
  constructor(time: string, img: string) {
    this.time = time;
    this.img = img;
  }
}

export default function Console({ params }) {
  const { id } = params;
  const [list, setList] = useState<ImgStatus[]>([
    new ImgStatus('2024-05-02 12:30:40', '')
  ])
  const [index, setIndex] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('2024-05-01');
  const [lastDate, setLastDate] = useState<string>('2024-05-10');
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
          <p>{startDate} ~ {lastDate}</p>
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
