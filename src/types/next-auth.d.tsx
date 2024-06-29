import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }

  interface User {
    email: string;
    name: string;
    email_verified_at: string;
    accessToken: string;
    address?: string;
    isVerified: boolean;
    expireDate: number;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface User {
    email: string;
    name: string;
    email_verified_at: string;
    accessToken: string;
    address?: string;
    isVerified: boolean;
    expireDate: number;
  }

  interface JWT extends User {
    accessToken: string;
    accessTokenExpires: number;
  }
}
