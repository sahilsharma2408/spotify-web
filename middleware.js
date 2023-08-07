import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
// import { redirect } from "next/navigation";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  /*
    Allow the requests if the following is true:
    1) If token is present
    2) It's a request for next auth session
  */
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  // return NextResponse.next();
  // Redirect the user if they are requesting for protected route and the token is not present
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/",
};
