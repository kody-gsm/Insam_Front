import Client from "@/assets/client";
import { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, response: Response) {
  const { email, password } = await req.json();
  console.log(email, password)

  return Client.post('/user/account/login', {
    email: email,
    password: password
  }).then((res: AxiosResponse) => {
    const data = {
      access: res.headers['set-cookie'][0].split('=')[1].replace(/"/g, ''),
      refresh: res['data']['refresh_token']
    }
    return NextResponse.json(data)
  }).catch(e => {
    return NextResponse.json(e, { status: 500 })
  })
}