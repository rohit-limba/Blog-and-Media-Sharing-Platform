import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "./prisma/PrismaClient";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // if (session.user) {
      //   session.user.username = token.username;
      // }
      return session;
    },
    async jwt({ token }) {
      // const user = await prisma.user.findUnique({
      //   where: {
      //     id: token.sub,
      //   },
      // });

      // if (!user) return token;

      // token.username = user.username;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
