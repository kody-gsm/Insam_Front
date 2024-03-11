import Nav from "@/components/nav/nav";
import './style.scss'
import Link from "next/link";

export default function Login() {
  return <div>
    <Nav />
    <main>
      <h1>
        로그인
      </h1>
      <div className="content">
        <b>이메일</b>
        <input placeholder="이메일을 적어주세요" />
        <b>비밀번호</b>
        <input placeholder="비밀번호를 적어주세요" />
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