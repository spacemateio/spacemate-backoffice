"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import IconDisplay from "../iconComponent/IconDisplay";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { menuItems } from "./MenuItems";

type Props = { children: ReactNode };
const Navbar = ({ children }: Props) => {
  const { data: session }: any = useSession();
  const [selectedMenuItem, setSelectedMenuItem] =
    useState<string>("/dashboard");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">SpaceMateIO</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className={
                    selectedMenuItem === item.url
                      ? "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-blue-600 bg-muted text-blue-600"
                      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-blue-600"
                  }
                  onClick={() => setSelectedMenuItem(item.url)}
                >
                  <IconDisplay iconName={item.icon} />
                  {item.name}
                </Link>
              ))}
              <Link
                href=""
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-all hover:text-red-700"
                onClick={() => signOut()}
              >
                <LineChart className="h-4 w-4" />
                Logout
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">SpaceMateIO</span>
                </Link>
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className={
                      selectedMenuItem === item.url
                        ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-blue-600"
                        : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-blue-600 transition-all hover:text-blue-600"
                    }
                    onClick={() => setSelectedMenuItem(item.url)}
                  >
                    <IconDisplay iconName={item.icon} />
                    {item.name}
                  </Link>
                ))}
                <Link
                  href=""
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-all hover:text-red-700"
                  onClick={() => signOut()}
                >
                  <LineChart className="h-4 w-4" />
                  Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {session ? `Hello ${session.user?.name}` : ""}
          </div>
          {/*<ToggleMode />*/}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Navbar;
