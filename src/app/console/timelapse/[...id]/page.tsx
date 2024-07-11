"use client"
import Nav from '@/components/nav/nav';
import './style.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tokenStore } from 'store';
import Client from '@/assets/client';
import { AxiosError, AxiosResponse } from 'axios';

interface ImgStatus {
  image_time: string;
  image: string;
}



export default function Console({ params }) {
  const { id } = params;
  const [list, setList] = useState<ImgStatus[]>([])
  const [index, setIndex] = useState<number>(0)
  const { access } = tokenStore(e => e);
  const GetImgs = async () => {
    if (!access) {
      return;
    }
    Client.get(`/user/image/${id}`, { headers: { 'access_token': access } })
      .then((e: AxiosResponse) => {
        const data: ImgStatus[] = e.data;
        const list: ImgStatus[] = data.map(e => {
          return {
            image_time: e.image_time,
            image: 'data:image/jpg;base64,' + e.image
          }
        })
        setList(list)
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
      }, 250);
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
              <div className='node'>
                {list.length !== 0 && <>
                  <p>{index + 1}/{list.length} {list[index]['image_time']}</p>
                  <img src={`${list[index]['image']}`} />
                </>}
              </div>
            </div>
          </div>
        </div>
      </div >
    </main >
  </div >
}
