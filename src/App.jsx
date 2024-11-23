import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import User from "./components/User";
import Analysis from "./components/Analysis";
import Role from "./components/Role";
import Permission from "./components/Permission";
function App() {
  return (
    <div className="flex ">
      <div className="">
        <SideBar />
      </div>
      <div className="flex justify-center items-center w-[70%] mobile:w-[80%] mobile:ml-12  font-poppins mx-auto">
        <Routes>
          <Route path="/User" element={<User />} />
          <Route path="/Role" element={<Role />} />
          <Route path="/Permission" element={<Permission />} />
          <Route index element={<Analysis />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
