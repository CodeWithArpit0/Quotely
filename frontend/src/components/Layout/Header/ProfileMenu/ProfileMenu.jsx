import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { User, Settings, LogOut, HelpCircle, KeyRound } from "lucide-react";

// * Components
import Avatar from "../../../UI/Avatar/Avatar";

// * Contexts
import { useAuth } from "../../../../context/authContext";

// * APIs and API Handler
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../../api/services/auth";

// * Utilities
import { removeItem } from "../../../../utils/localStorage";
import toast from "react-hot-toast";

export default function ProfileMenu() {
  const navigate = useNavigate();

  const { setIsLoggedIn, setUser, user } = useAuth();
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
    toast.success("Logout Successfully");
    navigate("/");
    document.cookie = "accessToken =; Max-Age=0";
    setIsLoggedIn(false);
    setUser(null);
    removeItem("isLoggedIn");
    removeItem("user");
  };
  const handleLogoutError = (error) => {
    console.log("ERROR : ", error);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong, please try again.");
    }
  };
  const handleLogout = () => logoutUserAPI.mutate();

  function getAvatarInitials(name) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const initials = parts.map((part) => part[0].toUpperCase()).join("");
    return initials;
  }
  return (
    <div className="relative inline-block">
      <Avatar
        label={user && user.username ? getAvatarInitials(user.username) : "US"}
        handler={toggleMenu}
      />

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1" role="menu">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {user.username || ""}
              </p>
              <p className="text-sm text-gray-500">{user.email || ""}</p>
            </div>

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
            <Link
              to="/changePassword"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <KeyRound className="mr-3 h-4 w-4" />
              Change Password
            </Link>

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
