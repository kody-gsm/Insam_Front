import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';

export default function Console({ params }) {
  const { id } = params;
  return <div>
    <Nav />
    <main>
      <div>
        <Link href={'/console'}>
          <h3 >
            뒤로가기
          </h3>
        </Link>
        <h1>
          화분 현황<br />
          #{id}
        </h1>
      </div>
      <div className="contents">
        <div className='flexs'>
          <div className='node'>
            <p>공기중 온도</p>
            <span>{20}˚C</span>
          </div>
          <div className='node'>
            <p>공기중 습도</p>
            <span>{20}%</span>
          </div>
          <div className='node'>
            <p>땅속 습도</p>
            <span>{20}%</span>
          </div>
          <div className='buttons'>
            <button>목표 {20}%</button>
            <button className='set_target'>목표 설정</button>
          </div>
        </div>
        <div className='second'>
          <div className='img'>
            <img src='https://i.pinimg.com/originals/80/2a/62/802a62c6515f83bdee0e8f0ef1a7c68c.jpg' alt='no camera' />
          </div>
          <div className='nodes'>
            <div className='node'>
              <p>남은 물</p>
              <span>{'매우 충분'}</span>
            </div>
            <div className='node'>
              <p>생장등 조절</p>
              <button>{'on'}</button>
            </div>
          </div>
        </div>
      </div>
    </main >
  </div >
}