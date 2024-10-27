import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/"];
const authRoutes = ["/auth"];

export default auth((req): any => {
  const { nextUrl } = req;
  const isLogIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/");
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLogIn) {
      return Response.redirect(new URL("/", nextUrl));
    }

    return null;
  }

  if (!isLogIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
