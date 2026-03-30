import { useState } from "react";

function ProfileMenu() {

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      {/* Top Profile Circle */}
      <div
  className="w-10 h-10 rounded-full flex items-center justify-center font-bold cursor-pointer text-white"
  style={{ backgroundColor: "#7c3aed" }}
  onClick={() => setOpen(!open)}
>
  S
</div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-lg p-3">

          <div className="flex items-center gap-3 mb-2">

           <div
  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
  style={{ backgroundColor: "#7c3aed" }}
>
  S
</div>

            <div>
              <p className="text-sm font-semibold">Soumik Das</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>

          </div>

          <hr className="mb-2"/>

          <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">Profile</p>
          <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">Saved Hostels</p>
          <p className="p-2 hover:bg-gray-100 rounded cursor-pointer">Settings</p>
          <p className="p-2 hover:bg-gray-100 rounded text-red-500 cursor-pointer">Logout</p>

        </div>
      )}

    </div>
  );
}

export default ProfileMenu;