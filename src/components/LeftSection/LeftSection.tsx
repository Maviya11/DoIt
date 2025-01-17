import { useContext } from "react";
import Navigations from "./Navigations";
import Profile from "./Profile";
import TaskDonut from "./TaskDonut";
import { authenticationContext } from "../../App";
interface Props {
  isSideBarVisible: boolean;
}

const LeftSection = ({ isSideBarVisible }: Props) => {
  const setIsAuthenticated = useContext(authenticationContext);

  return (
    <>
      <section
        className={`box-content h-[calc(100vh-40px)] bg-green-100 w-72 max-w-xs absolute mt-auto transition-all md:static md:bg-green-600/10 dark:bg-zinc-700 ${
          isSideBarVisible
            ? "left-0 z-10 md:w-[30%] "
            : "-left-full md:w-0 md:p-0 md:overflow-hidden 2xl:w-[30%] 2xl:px-4"
        }`}
      >
        <Profile />
        <div className="pt-20 px-4">
          <Navigations />
          <TaskDonut />
        </div>
        <div
          onClick={() => {
            if (setIsAuthenticated) setIsAuthenticated(false);
            localStorage.setItem("isAuthenticated", "");
          }}
          className="mt-12 border-t-2 border-slate-300 text-center pt-2 cursor-pointer dark:text-white"
        >
          Logout
        </div>
      </section>
    </>
  );
};

export default LeftSection;
