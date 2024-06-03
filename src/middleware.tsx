import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/models/UserRole";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token");
  const token = sessionToken?.value;
  const pathname = request.nextUrl.pathname;
  const loginPathname = "/auth/login";
  const registerPathname = "/auth/register";

  // Redirect to the login page if there's no token and the user is not already on the login page
  if (
    !token &&
    !(loginPathname === pathname || registerPathname === pathname)
  ) {
    console.log(
      "Redirecting to login because there is no token and the path is not /auth/login"
    );
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If the user has a token or they are already on the login page, allow to proceed
  // Prevent navigating away from the login page if there is no token
  if (!token && (loginPathname === pathname || registerPathname === pathname)) {
    console.log(
      "User is on the login page without a token, no redirection needed"
    );
    return NextResponse.next();
  }

  // If there is a token and the user is trying to access the login page, redirect them away from the login page
  if (
    token &&
    (loginPathname.includes(pathname) || registerPathname.includes(pathname))
  ) {
    console.log("Redirecting away from login because user already has a token");
    const url = new URL("/dashboard", request.url); // or direct them to another appropriate route, like /dashboard
    return NextResponse.redirect(url);
  }

  /*const userRoutes = ["/profile", "/change-password"];

  const adminRoutes = ["/profile", "/change-password", "users", "add-user"];

  const superAdminRoutes = [...adminRoutes, "/admins", "/add-admin"];

 if (token) {
    const url = request.nextUrl.clone();
    if (
      (user.role !== UserRole.Admin || user.role !== UserRole.Super_Admin) &&
      (adminRoutes.includes(pathname) || superAdminRoutes.includes(pathname))
    ) {
      return NextResponse.redirect(url);
    }

    if (user.role === UserRole.Admin && userRoutes.includes(pathname)) {
      return NextResponse.redirect(url);
    }
    if (user.role === UserRole.Admin && superAdminRoutes.includes(pathname)) {
      return NextResponse.redirect(url);
    }
    if (user.role === UserRole.Super_Admin && userRoutes.includes(pathname)) {
      return NextResponse.redirect(url);
    }
  }*/

  console.log("Proceeding with the request");
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
