import Insam from '@/assets/insam'
import './style.scss'
import Link from 'next/link'
export default function Footer() {
  return <footer>
    <div className='turn'>
      <Insam />
    </div>
    <div>
      <b>만든 사람들</b>
      <div className='names'>
        <div>
          <Link target='_blank' href={'https://github.com/dh1303'}>오영기</Link><br />
          <Link target='_blank' href={'https://github.com/byundojin'}>변도진</Link><br />
          <Link target='_blank' href={'https://github.com/kimgh06'}>김강현</Link>
        </div>
        <div>
          디자인 도움<br />
          <Link target='_blank' href={'https://github.com/GSMIOTjgh'}>진건희</Link>
        </div>
      </div>
    </div>
  </footer>
}