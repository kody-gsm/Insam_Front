import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.cookies.has("refresh");

  // 콘솔 창인데 인증 안됨
  if (!auth && request.nextUrl.pathname.startsWith("/console")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // 콘솔 창인데 인증 안됨
  if (!auth && request.nextUrl.pathname.startsWith("/console/:path")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // 콘솔 창인데 인증 안됨
  if (!auth && request.nextUrl.pathname.startsWith("/console/timelapse/:path")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // 로그인 되어 있는 데 로그인 하려는 경우
  if (auth && request.nextUrl.pathname.startsWith("login")) {
    return NextResponse.redirect(new URL("/console", request.url))
  }

}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
