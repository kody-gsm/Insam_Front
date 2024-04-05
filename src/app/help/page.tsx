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
        <h2>콘솔 사용법</h2>
        <span>알아서 생각하세요</span>
      </div>
    </main>
    <Footer />
  </div>
}