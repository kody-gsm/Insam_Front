import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import './style.scss';

export default function Help() {
  return <div className="help">
    <Header />
    <main>
      <h1>
        도움말
      </h1>
      <div className="write">
        <h2>이거슨 도움말의 첫 번째다</h2>
        <span>안녕하세요 저는 </span>
      </div>
    </main>
    <Footer />
  </div>
}