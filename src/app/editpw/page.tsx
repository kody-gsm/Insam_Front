"use client"
import Nav from "@/components/nav/nav";
import './style.scss'
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Client from "@/assets/client";

export default function Login() {
  const [verified, setVerified] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [timer, setTimer] = useState<number>(-1);
  const [pass, setPass] = useState<string>('');
  const edit = async () => {
    Client.post('/user/account/password', { email: email, password: pass })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          window.history.back();
        }
      })
      .catch((e: AxiosError) => {
        console.log(e)
      })
  }
  const sendmail = async () => {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
      alert('이메일 형식에 맞게 적어주세요')
      return;
    }
    await axios.post('/api/verifyingemail', { email })
      .then((res: AxiosResponse) => {
        setPass(res.data.code);
        alert("성공적으로 보내졌습니다.");
        setTimer(60);
      })
      .catch((e: AxiosError) => {
        console.log(e)
      })
  }
  const verifying = () => {
    if (pass === number && timer > 0) {
      setPass('');
      setVerified(true);
      return;
    }
    alert('번호가 맞지 않음.');
  }
  useEffect(() => {
    if (timer >= 0) {
      setTimeout(() => {
        setTimer(e => e - 1)
      }, 1000);
    }
  }, [timer])
  return <div>
    <Nav />
    <main>
      {!verified && <><h1> {/*1번 화면 */}
        비밀번호 변경
      </h1>
        <div className="content">
          <b>이메일</b>
          <input type="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="이메일을 적어주세요" />
          <b>인증번호</b>
          <input value={number} onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)} placeholder="인증번호를 적어주세요" />
          <div className="flex">
            {timer >= 0 && <span>남은 시간 {timer}초</span>}
            <span className="button" onClick={sendmail}>보내기</span>
          </div>
          <button onClick={verifying}>인증</button>
        </div></>}
      {verified && !confirmed && <>{/*2번 화면 */}
        <h1>
          비밀번호 변경
        </h1>
        <div className="content">
          <h1>이메일이 인증되었습니다.</h1>
          <button onClick={() => setConfirmed(true)}>비밀번호 변경 계속하기</button>
        </div></>}
      {verified && confirmed && <><h1>{/*3번 화면*/}
        비밀번호 변경
      </h1>
        <div className="content">
          <b>비밀번호</b>
          <input value={pass} onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)} placeholder="비밀번호를 적어주세요" />
          <button onClick={edit}>비밀번호 변경</button>
        </div>
      </>}
    </main>
  </div>
}