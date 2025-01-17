import React, { createContext, useState } from "react";
import LeftSection from "../LeftSection/LeftSection";
import ListSection from "../ListSection/ListSection";
import RightSection from "../RightSection/RightSection";
import Navbar from "./Navbar";

export const setRightSectionContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

const HomePage = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [isRightSectionVisible, setIsRightSectionVisible] = useState(false);

  return (
    <setRightSectionContext.Provider value={setIsRightSectionVisible}>
      <div className="h-screen dark:bg-zinc-900/90">
        <Navbar onClick={() => setIsSideBarVisible(!isSideBarVisible)} />
        <div className="flex gap-2">
          <LeftSection isSideBarVisible={isSideBarVisible} />
          <ListSection />
          <RightSection isRightSectionVisible={isRightSectionVisible} />
        </div>
      </div>
    </setRightSectionContext.Provider>
  );
};

export default HomePage;
