import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("token: ", req.nextauth.token);
    if (
      req.nextUrl.pathname.startsWith("/Admin") &&
      req.nextauth.token?.role !== "admin"
    )
      return NextResponse.rewrite(new URL("/error", req.url));
    if (
      req.nextUrl.pathname.startsWith("/protected") &&
      req.nextauth.token?.role !== "user"
    )
      return NextResponse.rewrite(new URL("/", req.url));

    if (
      req.nextUrl.pathname.includes("email") &&
      req.nextauth.token?.role === "user"
    ) {
      const validateUrl = req.nextUrl.pathname.split("&email");
      return NextResponse.rewrite(new URL(validateUrl[0], req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/Admin/:path*", "/api/:path*"] };
