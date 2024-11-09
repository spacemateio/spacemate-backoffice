import { ReactNode, useState } from "react";
import IconDisplay from "../iconComponent/IconDisplay";
import { menuItems } from "./MenuItems";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuth } from "../../lib/features/auth/AuthContext.tsx";
import { Link } from "react-router-dom";
import ProfileButton from "../profile/ProfileButton.tsx";

type Props = { children: ReactNode };

const Navbar = ({ children }: Props) => {
  const [selectedMenuItem, setSelectedMenuItem] =
    useState<string>("/dashboard");
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null); // For toggling submenu
  const { userInfo } = useAuth();

  const toggleSubMenu = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    setExpandedMenu((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <img
                src="https://spacemate.io/favicon.ico"
                alt="SpaceMate.io"
                className="h-6 w-6"
              />
              <span>SpaceMate.io</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {menuItems.map((item) => (
                <div key={item.id}>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-600
                    ${selectedMenuItem === item.url ? "bg-muted text-blue-600" : "text-gray-500"}`}
                    onClick={(e) => {
                      setSelectedMenuItem(item.url);
                      if (item.submenu) toggleSubMenu(item.id, e);
                    }}
                  >
                    <IconDisplay iconName={item.icon} />
                    {item.name}
                    {item.submenu && (
                      <IconDisplay
                        iconName={
                          expandedMenu === item.id
                            ? "ChevronDown"
                            : "ChevronRight"
                        }
                        addStyle="ml-auto"
                      />
                    )}
                  </Link>
                  {item.submenu && expandedMenu === item.id && (
                    <div
                      className="ml-2 mt-2 space-y-1 pl-4"
                      style={{ position: "relative", zIndex: 10 }}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.url}
                          className="flex items-center gap-3 rounded-lg py-2 text-sm text-gray-500 hover:text-blue-600"
                          style={{ zIndex: 10 }}
                        >
                          <IconDisplay iconName={subItem.icon} addStyle="" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
                <IconDisplay iconName="Menu" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <img
                    src="https://spacemate.io/favicon.ico"
                    alt="SpaceMate.io"
                    className="h-6 w-6"
                  />
                  <span>SpaceMate.io</span>
                </Link>
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <Link
                      to={item.url}
                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-blue-600
                      ${selectedMenuItem === item.url ? "text-blue-600" : "text-gray-500"}`}
                      onClick={(e) => {
                        setSelectedMenuItem(item.url);
                        if (item.submenu) toggleSubMenu(item.id, e);
                      }}
                    >
                      <IconDisplay iconName={item.icon} />
                      {item.name}
                      {item.submenu && (
                        <IconDisplay
                          iconName={
                            expandedMenu === item.id
                              ? "ChevronDown"
                              : "ChevronRight"
                          }
                          addStyle="ml-auto"
                        />
                      )}
                    </Link>
                    {item.submenu && expandedMenu === item.id && (
                      <div
                        className="ml-2 mt-2 space-y-1 pl-4"
                        style={{ position: "relative", zIndex: 10 }}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.id}
                            to={subItem.url}
                            className="flex items-center gap-4 rounded-lg px-3 py-2 text-sm text-gray-500 hover:text-blue-600"
                            style={{ zIndex: 10 }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex items-center justify-between">
            {userInfo ? `Hello ${userInfo?.name}` : ""}
            <ProfileButton />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Navbar;
