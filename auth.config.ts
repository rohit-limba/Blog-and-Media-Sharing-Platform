import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { loginFormSchema } from "./FormSchemas/SignInForm";
import prisma from "./prisma/PrismaClient";
import { validateUser } from "./lib/utils";

export default {
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const validateFeilds = loginFormSchema.safeParse(credentials);

        if (validateFeilds.success) {
          const { username, password } = validateFeilds.data;

          const userUsername = await prisma.user.findUnique({
            where: {
              username,
            },
          });

          const userEmail = await prisma.user.findUnique({
            where: {
              email: username,
            },
          });

          if (!userEmail && !userUsername) return null;

          if (userEmail) {
            const flag = await validateUser(password, userEmail.password);
            if (flag) return userEmail;
          } else if (userUsername) {
            const flag = await validateUser(password, userUsername.password);
            if (flag) {
              return userUsername;
            }
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
