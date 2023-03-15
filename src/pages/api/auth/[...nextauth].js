import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { login } from "@/backend/modules/users/user.controller";
import { dbConnect } from "@/backend/config/database";
import * as _ from "lodash";

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        await dbConnect();
        const user = await login(credentials);
        if (_.isError(user)) {
          throw user;
        }
        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      console.log("user : ", user);
      return { ...token, ...user };
    },

    session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/Authentication/Login",
  },
};

export default NextAuth(authOptions);
