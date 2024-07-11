import { useLocation, useNavigate } from "react-router-dom";
import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { LogOut, ScanFace } from "lucide-react";
import { Button } from "./ui/button";
import { SearchInput } from "./search-input";
import "./components.css";

const NavbarRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isTeacher = location.pathname.startsWith("/teacher");
  const isPlayerPage = location.pathname.includes("/course");
  const isSearchPage = location.pathname === "/search";

  const directPage = () => {
    if (isTeacher) {
      navigate("/");
    } else {
      navigate("/search");
    }
  };
  return (
    <>
      {isSearchPage && (
        <div className="search-input">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacher || isPlayerPage ? (
          <Button onClick={directPage} size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        ) : (
          <div>
            <Button
              onClick={() => navigate("/teacher/courses")}
              size="sm"
              variant="ghost"
            >
              Teacher Mode
            </Button>
          </div>
        )}
        <SignedOut>
          <ScanFace />
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </>
  );
};

export default NavbarRoutes;
