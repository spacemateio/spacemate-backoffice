import NextAuth, { User } from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/utils/axiosInstance";
import { AuthLoginResponse } from "@/lib/features/apis/Auth/types/AuthLoginResponseModel";
import { Credentials } from "@/lib/features/apis/Auth/types/Credentials";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { Session } from "next-auth";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials) {
        try {
          const jsonCredentials = JSON.stringify(credentials);
          const encodedCredentials = btoa(jsonCredentials); //"eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoidGVzdDEifQ==";

          const response = await axiosInstance.get(
            `/login?credentials=${encodedCredentials}`
          );

          return response.data;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: AuthLoginResponse;
      account: Account;
    }) {
      console.log("signIn");
      if (account?.provider == "credentials") {
        return true;
      }
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: User;
      user: any;
      account: any;
    }) {
      // user and account are only defined the first time this callback is called
      console.log("JWT callback");
      if (user) {
        //token.id = user.id;
        //token.role = user.role;
      }
      if (user?.token) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: User }) {
      console.log("session callback");
      session.user = token as any;
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
