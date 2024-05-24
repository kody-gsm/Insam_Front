"use client"
import Insam from '@/assets/insam';
import './style.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tokenStore, widthStore } from 'store';

export default function Header() {
  const { wid, setWid } = widthStore(e => e);
  const { refresh, setRefresh } = tokenStore(e => e);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    setWid(window.innerWidth);
    if (document.cookie) {
      const ref = document.cookie?.split('refresh=')[1]?.split(';')[0];
      if (!ref) {
        return;
      }
      setRefresh(ref)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        setWid(window.innerWidth);
      })
    }
  }, [])
  return <header>
    <div className='inner'>
      <Insam />
      {wid > 768 && <>
        <Link href={'/introduce'}>제품소개</Link>
        <Link href={'/faq'}>자주 묻는 질문들</Link>
        <Link href={'/help'}>도움말</Link>
      </>
      }
      {(!refresh || wid > 768) ?
        <Link className="login" href={'/login'}>
          로그인{wid > 768 && '/회원가입하기'}</Link> : <>
          <Link href={'/console'}>
            <span className='but'>콘솔로</span>
          </Link>
          <span className='but' onClick={() => {
            document.cookie = 'refresh=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
            localStorage.clear();
            window.location.href = '/';
          }}>로그아웃</span>
        </>}
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