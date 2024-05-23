"use client"
import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tokenStore } from 'store';
import Client from '@/assets/client';
import { AxiosError, AxiosResponse } from 'axios';

class ImgStatus {
  time: string;
  img: string;
  constructor(time: string, img: string) {
    this.time = time;
    this.img = img;
  }
}

export default function Console({ params }) {
  const { id } = params;
  const [list, setList] = useState<ImgStatus[]>()
  const [index, setIndex] = useState<number>(0)
  const { access } = tokenStore(e => e);
  const GetImgs = async () => {
    if (!access) {
      return;
    }
    Client.get(`/user/image/${id}`, { headers: { 'access_token': access } })
      .then((e: AxiosResponse) => {
        setList(e.data)
      })
      .catch((e: AxiosError) => {
        alert(e.message);
      })
  }
  useEffect(() => {
    GetImgs();
  }, [access]);
  useEffect(() => {
    if (list) {
      setTimeout(() => {
        if (index + 1 >= list.length) {
          setIndex(0);
        } else {
          setIndex(e => e + 1);
        }
      }, 1000);
    }
  }, [list, index])
  return <div>
    <Nav />
    <main>
      <div className='pointer'>
        <Link href={`/console`}>
          <h3>
            메인 콘솔로
          </h3>
        </Link>
        <h1>
          타임랩스<br />
          #{id}
        </h1>
      </div>
      <div className="contents">
        <div className='second'>
          <div className='nodes'>
            <div className='between'>
              <div className='node'>{
                list && <>
                  <p>{index + 1}번째 {list[index]['image_time']}</p>
                  <img src={`http://standard.alcl.cloud:22537/image/${list[index]['image']}`} />
                </>}
              </div>
            </div>
          </div>
        </div>
      </div >
    </main >
  </div >
}
