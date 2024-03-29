"use client"
import Nav from "@/components/nav/nav";
import './style.scss'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const [verified, setVerified] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [timer, setTimer] = useState(null)
  const [pass, setPass] = useState('')
  const register = async e => {

  }
  const sendmail = async e => {
    await axios.post('/api/verifyingemail', { email }).then(e => {
      setPass(e.data.code);
      alert("성공적으로 보내졌습니다.");
      setTimer(60);
    }).catch(e => {
      console.log(e)
    })
  }
  const verifying = e => {
    if (pass === number && timer > 0) {
      setPass('');
      setVerified(true);
      return;
    }
    alert('번호가 맞지 않음.');
  }
  useEffect(e => {
    if (timer >= 0) {
      setTimeout(() => {
        setTimer(e => e - 1)
      }, 1000);
    }
  }, [timer])
  return <div>
    <Nav />
    <main>
      {!verified && <><h1> {/*1번 */}
        회원가입
      </h1>
        <div className="content">
          <b>이메일</b>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일을 적어주세요" />
          <b>인증번호</b>
          <input value={number} onChange={e => setNumber(e.target.value)} placeholder="인증번호를 적어주세요" />
          <div className="flex">
            {timer >= 0 && <span>남은 시간 {timer}초</span>}
            <span className="button" onClick={e => sendmail()}>보내기</span>
          </div>
          <button onClick={e => verifying()}>인증</button>
        </div></>}
      {verified && !confirmed && <><h1>{/*2번 */}
        회원가입
      </h1>
        <div className="content">
          <h1>이메일이 인증되었습니다.</h1>
          <button onClick={e => setConfirmed(true)}>회원가입 계속하기</button>
        </div></>}
      {verified && confirmed && <><h1>{/*3번 */}
        회원가입
      </h1>
        <div className="content">
          <b>비밀번호</b>
          <input placeholder="비밀번호를 적어주세요" />
          <button onClick={register}>회원가입</button>
        </div></>}
    </main>
  </div>
}