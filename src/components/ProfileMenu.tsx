import { useState } from "react";
import { LogOut, User, Heart, Settings } from "lucide-react";

interface ProfileMenuProps {
  userName?: string;
  userRole?: "student" | "owner";
  userInitial?: string;
  onLogout?: () => void;
}

const ProfileMenu = ({
  userName = "Soumik Das",
  userRole = "student",
  userInitial = "S",
  onLogout = () => window.location.href = "/"
}: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  const capitalizedRole = userRole === "student" ? "Student" : "Property Owner";

  return (
    <div className="relative">
      {/* Profile Circle */}
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
        style={{ backgroundColor: "#7c3aed" }}
        onClick={() => setOpen(!open)}
        aria-label="Open profile menu"
      >
        {userInitial}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-slate-900 shadow-lg rounded-lg p-3 z-50">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
              style={{ backgroundColor: "#7c3aed" }}
            >
              {userInitial}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">{capitalizedRole}</p>
            </div>
          </div>

          <hr className="mb-2 dark:border-slate-700" />

          {/* Menu Items */}
          <button
            className="w-full text-left px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer text-sm text-foreground flex items-center gap-2 transition-colors"
            onClick={() => setOpen(false)}
          >
            <User size={16} />
            Profile
          </button>
          
          {userRole === "student" && (
            <button
              className="w-full text-left px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer text-sm text-foreground flex items-center gap-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              <Heart size={16} />
              Saved Hostels
            </button>
          )}
          
          <button
            className="w-full text-left px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer text-sm text-foreground flex items-center gap-2 transition-colors"
            onClick={() => setOpen(false)}
          >
            <Settings size={16} />
            Settings
          </button>
          
          <hr className="my-2 dark:border-slate-700" />
          
          <button
            className="w-full text-left px-2 py-2 hover:bg-red-50 dark:hover:bg-red-900 rounded cursor-pointer text-sm text-red-600 dark:text-red-400 flex items-center gap-2 transition-colors font-medium"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
