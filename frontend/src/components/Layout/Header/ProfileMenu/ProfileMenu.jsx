import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { User, Settings, LogOut, HelpCircle } from "lucide-react";

// * Components
import Avatar from "../../../UI/Avatar/Avatar";

// * Contexts
import { useAuth } from "../../../../context/authContext";

// * APIs and API Handler
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../../api/services/auth";

// * Utilities
import { removeItem } from "../../../../utils/localStorage";

export default function ProfileMenu() {
  const navigate = useNavigate();

  const { setIsLoggedIn } = useAuth();
  const menuRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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

  const logoutUserAPI = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => handleLogoutSuccess(),
    onError: (error) => handleLogoutError(error),
  });
  const handleLogoutSuccess = () => {
    navigate("/");
    document.cookie = "accessToken =; Max-Age=0";
    setIsLoggedIn(false);
    removeItem("isLoggedIn");
  };
  const handleLogoutError = (error) => {
    console.log("ERROR : ", error);
  };
  const handleLogout = () => logoutUserAPI.mutate();

  return (
    <div className="relative inline-block">
      {/* Avatar Button */}
      <Avatar label="AS" handler={toggleMenu} />

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1" role="menu">
            {/* Profile Section */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">john@example.com</p>
            </div>

            {/* Menu Items */}
            <a
              href="#profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </a>

            <a
              href="#settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </a>

            <a
              href="#help"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <HelpCircle className="mr-3 h-4 w-4" />
              Help & Support
            </a>

            <div className="border-t border-gray-100">
              <button
                className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
