"use client"
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import './style.scss';
import { ChangeEvent, useState } from "react";

export default function Help() {
  return <div className="help">
    <Header />
    <main>
      <h1>
        자주 묻는 질문들
      </h1>
      <QnA q={'zustand는 신입니까?'} a={'아니오'} />
      <QnA q={'zustand는 신입니까?'} a={'아니오'} />
      <QnA q={'zustand는 신입니까?'} a={'아니오'} />
      <QnA q={'zustand는 신입니까?'} a={'아니오'} />
      <QnA q={'zustand는 신입니까?'} a={'아니오'} />
      <QnA q={'zustand는 신입니까?'} a={'아니오'} />
      <QnA q={'zustand는 신입니까?'} a={'아니오'} />
    </main>
    <Footer />
  </div>
}

function QnA({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState<boolean>(false);
  return <>
    <div className="Q" onClick={() => setOpen((e: boolean) => !e)}>
      <div>Q. {q}</div>
      <div className={`svg ${open && 'turn'}`}>
        <svg width="30" height="30" viewBox="0 0 54 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 5.55556L27.4694 25L50 4" stroke="black" strokeWidth="5" />
        </svg>
      </div>
    </div>
    {open && <div className="A">
      <p>A. {a}</p>
    </div>}
  </>
}