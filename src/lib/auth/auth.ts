import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import authConfig from "./auth.config";
import { db } from "@/db";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  adapter: DrizzleAdapter(db),
  trustHost: true,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      // console.log("token", token);
      if (!token.sub) return token;
      return token;
    },
    async session({ token, session, user }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  ...authConfig,
});
