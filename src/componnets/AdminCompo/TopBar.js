import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import userImage from "../../Images/user.jpg";

const TopBar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between w-full px-6  h-[60px] mt-6">
      <h1 className="text-lg font-semibold text-gray-700">
        Hi, Welcome Back!
      </h1>

      <div className="flex items-center bg-neutral-700 h-[50px] rounded-full px-4">
        <img
          src={userImage}
          alt="User Profile"
          className="h-[40px] w-[40px] rounded-full"
        />
        <div className="ml-3">
          <p className="text-sm font-bold text-neutral-200">{user.fname}</p>
          <p className="text-xs text-neutral-400">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
