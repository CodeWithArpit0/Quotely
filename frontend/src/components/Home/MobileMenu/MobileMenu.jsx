import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Settings, LogIn, UserRoundPlus, HelpCircle } from "lucide-react";

export default function MobileMenu({ toggleMenu }) {
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div className="py-1" role="menu">
        <Link
          to="ile"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <User className="mr-3 h-4 w-4" />
          Profile
        </Link>

        <Link
          to="ings"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Link>

        <Link
          to=""
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <HelpCircle className="mr-3 h-4 w-4" />
          Help & Support
        </Link>

        <Link
          to="/login"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <LogIn className="mr-3 h-4 w-4" />
          Login
        </Link>

        <Link
          to="/register"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <UserRoundPlus className="mr-3 h-4 w-4" />
          Register
        </Link>
      </div>
    </div>
  );
}
