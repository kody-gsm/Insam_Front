"use client"
import Nav from "@/components/nav/nav";
import './style.scss'
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  return <div>
    <Nav />
    <main>
      <h1>
        로그인
      </h1>
      <div className="content">
        <b>이메일</b>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일을 적어주세요" />
        <b>비밀번호</b>
        <input value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호를 적어주세요" />
        <button>로그인</button>
        <Link href={'/signup'}>
          <h3>
            계정이 없다면 회원가입
          </h3>
        </Link>
      </div>
    </main>
  </div>
}