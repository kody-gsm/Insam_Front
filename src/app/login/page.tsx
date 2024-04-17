"use client"
import Nav from "@/components/nav/nav";
import './style.scss'
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Client from "@/assets/client";
import axios, { AxiosResponse } from "axios";
import { tokenStore } from "store";

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [pw, setPw] = useState<string>('')
  const { setAccess, setRefresh } = tokenStore(e => e);
  const TryLogin = async (e: FormEvent) => {
    e.preventDefault();
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
    if (!pattern.test(email)) {
      alert('이메일 형식에 맞게 적어주세요')
      return;
    }
    axios.post('/api/getToken', {
      email: email,
      password: pw
    }).then((res: AxiosResponse) => {
      setAccess(res.data.access)
      setRefresh(res.data.refresh)
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      window.location.href = '/console'
    }).catch(e => {
      alert(e)
      console.log(e)
    })
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