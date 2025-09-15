import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Menu, X, Sun, Moon, Briefcase, User, LogOut, Settings } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/contexts/AuthContext";
import NotificationPanel from "@/components/NotificationPanel";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavigationItems = () => {
    if (!user) {
      return [
        { path: "/", label: "Home" },
        { path: "/jobs", label: "Find Jobs" },
      ];
    }
    
    if (user.role === 'client') {
      return [
        { path: "/", label: "Home" },
        { path: "/client-dashboard", label: "Dashboard" },
        { path: "/jobs", label: "Browse Hustlers" },
      ];
    } else {
      return [
        { path: "/", label: "Home" },
        { path: "/hustler-dashboard", label: "Dashboard" },
        { path: "/jobs", label: "Find Jobs" },
      ];
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const navLinks = getNavigationItems();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-xl bg-gradient-primary bg-clip-text text-transparent">
              JuaHustle
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to="/" className="flex items-center space-x-2 md:hidden">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="font-bold bg-gradient-primary bg-clip-text text-transparent">
                JuaHustle
              </span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            {/* Notifications (if logged in) */}
            {user && <NotificationPanel />}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={user.role === 'client' ? '/client-dashboard' : '/hustler-dashboard'}>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] w-full grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6" />
              <span className="font-bold">JuaHustle</span>
            </Link>
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline ${
                    isActive(link.path) ? "text-primary" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;