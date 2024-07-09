"use client"
import Nav from "@/components/nav/nav";
import './style.scss'
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { tokenStore } from "store";
import Client from "@/assets/client";

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [pw, setPw] = useState<string>('')
  const { setRefresh, setAccess } = tokenStore(e => e);
  const TryLogin = async (e: FormEvent) => {
    e.preventDefault();
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
    if (!pattern.test(email)) {
      alert('이메일 형식에 맞게 적어주세요')
      return;
    }
    Client.post('/user/account/login', {
      email: email,
      password: pw
    }).then((res: AxiosResponse) => {
      setRefresh(res.data['refresh_token'])
      setAccess(res.data['access_token'])
      localStorage.setItem('refresh', res.data['refresh_token'])
      document.cookie = `refresh=${res.data['refresh_token']}`;
      localStorage.setItem('refreshTime', (new Date().getTime() + 1000 * 60 * 10).toString());
      window.location.href = '/console';
    }).catch((e: AxiosError) => {
      if (e.response.status === 500) {
        alert('다시 시도 해주세요.')
        return;
      }
      if (e.response.status === 401) {
        alert('아이디나 비밀번호가 맞지 않습니다.')
        return;
      }
      alert(e)
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
        <input value={email} type="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="이메일을 적어주세요" />
        <b>비밀번호</b>
        <input value={pw} type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => setPw(e.target.value)} placeholder="비밀번호를 적어주세요" />
        <button>로그인</button>
        <Link href={'/signup'}>
          <h3>
            계정이 없다면 회원가입
          </h3>
        </Link>
        <hr />
        <Link href={'/editpw'}>
          <h3>
            비밀번호 변경
          </h3>
        </Link>
      </form>
    </main>
  </div>
}