"use client"
import Nav from "@/components/nav/nav";
import './style.scss'
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [pw, setPw] = useState<string>('')
  const TryLogin = (e: FormEvent) => {
    e.preventDefault();
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
    if (!pattern.test(email)) {
      alert('이메일 형식에 맞게 적어주세요')
      return;
    }
  }
  return <div>
    <Nav />
    <main>
      <h1>
        로그인
      </h1>
      <form className="content" onSubmit={TryLogin}>
        <b>이메일</b>
        <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="이메일을 적어주세요" />
        <b>비밀번호</b>
        <input value={pw} onChange={(e: ChangeEvent<HTMLInputElement>) => setPw(e.target.value)} placeholder="비밀번호를 적어주세요" />
        <button>로그인</button>
        <Link href={'/signup'}>
          <h3>
            계정이 없다면 회원가입
          </h3>
        </Link>
      </form>
    </main>
  </div>
}