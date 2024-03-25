import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { loginSchema } from "../validationSchema/loginSchema";
import { getUserByEmail } from "../data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validationSchema = loginSchema.safeParse(credentials);

        if (!validationSchema.success) {
          return null;
        }

        const { email, password } = validationSchema.data;

        const user = await getUserByEmail(email);

        // getUserByEmail is returning an array so using index of 0

        if (!user || !user.password) {
          // The empty check for password is checked if user is signing in with Google or Github
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
