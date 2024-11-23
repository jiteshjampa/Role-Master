import React from "react";
import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { PiLockKeyOpenFill } from "react-icons/pi";
const SideBar = () => {
  return (
    <div className=" font-poppins fixed h-screen" data-theme="synthwave">
      <h1 className=" font-poppins text-white mobile:hidden text-center mt-7 text-xl mb-6 resp:p-2 resp:text-sm">
        {" "}
        RoleMaster
      </h1>
      <div className=" flex  items-center w-fit p-7 resp:w-fit resp:p-4   font-medium">
        <div className="h-screen flex flex-col  space-y-9">
          <Link to="/">
            <div className="flex ">
              <MdDashboard className=" w-5 h-5 mr-2" />
              <span className=" resp:hidden">Analysis</span>
            </div>
          </Link>
          <Link to="/User">
            <div className="flex ">
              <FaUsers className=" w-5 h-5 mr-2" />{" "}
              <span className=" resp:hidden">User</span>
            </div>
          </Link>
          <Link to="Role">
            <div className="flex">
              <GoPasskeyFill className="w-5 h-5 mr-2" />{" "}
              <span className=" resp:hidden"> Role</span>
            </div>
          </Link>

          <Link to="/Permission">
            <div className="flex">
              <PiLockKeyOpenFill className=" w-5 h-5 mr-2" />{" "}
              <span className=" resp:hidden">Permission</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
