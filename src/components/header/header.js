import Insam from '@/assets/insam';
import './style.scss';
import Link from 'next/link';

export default function Header() {
  return <header>
    <Insam />
    <Link href={'/introduce'}>제품소개</Link>
    <Link href={'/faq'}>자주 묻는 질문들</Link>
    <Link href={'/help'}>도움말</Link>
    <Link className="login" href={'/login'}>로그인/회원가입하기</Link>
  </header>
}