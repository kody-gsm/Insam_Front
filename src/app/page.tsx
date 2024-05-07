"use client"
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import './style.scss'
import Link from "next/link";
import { widthStore } from "store";
export default function Home() {
  const { wid, setWid } = widthStore(e => e);
  return <div className="landing">
    <Header />
    {/* <main> */}
    <div className="flexbox">
      <div>
        <h1>스마트한<br />
          스마트팜 Insam</h1>
        <h3>누구나 쉽게 스마트 팜을 사용할 수 있도록 도와 드려요.</h3>
      </div>
      {wid > 768 && <svg width="360" height="439" viewBox="0 0 365 439" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 328.5V112.5L184.5 4L362 112.5V328.5L184.5 435.5L3 328.5Z" stroke="black" strokeWidth="6" />
        <path d="M82.5 280.487V160.348L183.614 100L282.5 160.348V280.487L183.614 340L82.5 280.487Z" stroke="black" strokeWidth="6" />
      </svg>}
    </div>
    <div className="flexbox">
      <div>
        <h1>어디에서나<br />
          언제든지 OK!</h1>
        <h3>원격으로 스마트 팜의 상태를 확인하고 관리할 수 있아요.</h3>
      </div>
      {wid > 768 && <svg width="360" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="494" height="494" rx="247" fill="white" stroke="black" strokeWidth="6" />
        <path d="M370 249.5H241V55" stroke="black" strokeWidth="6" />
      </svg>}
    </div>
    <div className="flexbox">
      <div>
        <h1>지금 당장
          시작해 보세요.</h1>
        <Link href={'/login'}><h3>로그인 / 회원가입하기</h3></Link>
      </div>
      {wid > 768 && <svg width="360" height="360" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M284.391 5L8.69585 280" stroke="black" strokeWidth="10" strokeLinecap="round" />
        <path d="M355 80.2827L79.8884 354.7" stroke="black" strokeWidth="10" strokeLinecap="round" />
        <path d="M55.1265 238.333L121.962 305" stroke="black" strokeWidth="10" strokeLinecap="round" />
        <path d="M285.605 9.89722L352.44 76.5639" stroke="black" strokeWidth="10" strokeLinecap="round" />
        <path d="M5.30188 282.124L5.00001 354.999" stroke="black" strokeWidth="10" strokeLinecap="round" />
        <path d="M5 355L80.6715 355" stroke="black" strokeWidth="10" strokeLinecap="round" />
      </svg>}
    </div>
    {/* </main> */}
    <Footer />
  </div>
}