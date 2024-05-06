"use client"
import Insam from '@/assets/insam';
import './style.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [wid, setWid] = useState<null | number>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setWid(window.innerWidth);
    })
  }
  return <header>
    <div className='inner'>
      <Insam />
      {wid > 768 && <>
        <Link href={'/introduce'}>제품소개</Link>
        <Link href={'/faq'}>자주 묻는 질문들</Link>
        <Link href={'/help'}>도움말</Link>
      </>
      }
      <Link className="login" href={'/login'}>로그인{wid > 768 && '/회원가입하기'}</Link>
      {wid <= 768 && <div onClick={() => setToggle((e: boolean) => !e)} className={`hams ${toggle && 'act'}`}>
        <div className='ham' />
        <div className='ham' />
        <div className='ham' />
      </div>}
    </div>
    {toggle && wid <= 768 && <div className='togglemenu'>
      <Link href={'/introduce'}>제품소개</Link>
      <Link href={'/faq'}>자주 묻는 질문들</Link>
      <Link href={'/help'}>도움말</Link>
    </div>}
  </header>
}