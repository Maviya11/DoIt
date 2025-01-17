import { useEffect, useState } from "react";
import { IoReorderThreeOutline, IoSearchOutline } from "react-icons/io5";
import { PiSquaresFour } from "react-icons/pi";
import { TbMoonStars } from "react-icons/tb";
import { FiSun } from "react-icons/fi";
import logo from "../../assets/logo.webp";

interface Props {
  onClick: () => void;
}

const Navbar = ({ onClick }: Props) => {
  const [isDarkMode, setISDarkMode] = useState<boolean>();

  // Get theme from local storage
  useEffect(() => {
    const theme = localStorage.getItem("Theme");
    if (theme === "dark") {
      setISDarkMode(true);
    } else {
      setISDarkMode(false);
    }
  }, []);

  return (
    <header className="px-2 py-1 mb-3 flex justify-between mx-auto sm:px-6 md:py-2 shadow-lg">
      <div className="flex items-center">
        <IoReorderThreeOutline
          size={30}
          onClick={onClick}
          className="dark:text-white"
        />
        <img src={logo} alt="sdfsdfdsd" className="h-8 ml-2" />
        <h1 className="font-serif text-green-700 text-xl font-medium">DoIt</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <IoSearchOutline size={24} className="dark:text-white" />
        <PiSquaresFour size={25} className="dark:text-white" />
        {!isDarkMode ? (
          <TbMoonStars
            onClick={() => {
              setISDarkMode(true);
              localStorage.setItem("Theme", "dark");
              document.documentElement.classList.add("dark");
            }}
            size={24}
            className="dark:text-white"
          />
        ) : (
          <FiSun
            size={24}
            onClick={() => {
              setISDarkMode(false);
              localStorage.setItem("Theme", "light");
              document.documentElement.classList.remove("dark");
            }}
            className="dark:text-white"
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
