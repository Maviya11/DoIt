import { useState } from "react";
import { PiNotepad } from "react-icons/pi";
import { FiCalendar } from "react-icons/fi";
import { IoStarOutline } from "react-icons/io5";
import { IoMapOutline } from "react-icons/io5";
import { BsPersonCheck } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi2";

const navItem = [
  { icon: PiNotepad, label: "All Tasks" },
  { icon: FiCalendar, label: "Today" },
  { icon: IoStarOutline, label: "Important" },
  { icon: IoMapOutline, label: "Planned" },
  { icon: BsPersonCheck, label: "Assigned to me" },
];

const Navigations = () => {
  // State to highlight selected navigation
  const [selectedNavigation, setSelectedNavigation] = useState(0);

  return (
    <>
      <ul className="bg-white mt-3 rounded-sm w-[95%] mx-auto dark:bg-zinc-800/50">
        {navItem.map((item, index) => (
          <li
            key={index}
            onClick={() => setSelectedNavigation(index)}
            className={`flex items-center justify-start py-2 px-5 rounded-md cursor-pointer dark:text-white ${
              selectedNavigation === index
                ? "bg-green-200/60 text-green-600 dark:bg-green-200/15 dark:text-green-600"
                : "hover:bg-slate-100/70 dark:hover:bg-zinc-600"
            }`}
          >
            <item.icon size={24} />
            <span className="font-Ubuntu pl-4">{item.label}</span>
          </li>
        ))}
      </ul>
      <div className="bg-white mt-3 rounded-sm w-[95%] mx-auto flex items-center py-5 px-5 dark:bg-zinc-800/50 dark:text-white">
        <HiOutlinePlus size={26} />
        <span className="font-Ubuntu pl-4">Add List</span>
      </div>
    </>
  );
};

export default Navigations;
