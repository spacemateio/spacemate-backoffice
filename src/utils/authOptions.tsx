import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/utils/axiosInstance";
import { Session, AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        try {
          const jsonCredentials = JSON.stringify(credentials);
          const encodedCredentials = btoa(jsonCredentials);

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
    async signIn({ user, account }: { user: any; account: any }) {
      console.log("signIn");
      if (account?.provider == "credentials") {
        return true;
      }
      return false;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
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
    async session({ session, token }: { session: Session; token: any }) {
      console.log("session callback");
      session.user = token as any;
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
