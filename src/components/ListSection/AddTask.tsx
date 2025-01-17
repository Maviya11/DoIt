import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todos/todoSlice";
import { FaRegBell } from "react-icons/fa6";
import { BsRepeat } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";

const AddTask = () => {
  const [input, setInput] = useState({ text: "", priority: "none" });
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents the page refresh
    event.preventDefault();
    dispatch(
      addTodo({
        id: nanoid(),
        text: input.text,
        isCompleted: false,
        isImportant: false,
        priority: input.priority,
      })
    );

    // Empty the input field
    setInput({ text: "", priority: "none" });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-2 mb-10 bg-gradient-to-t from-green-600/15 to-green-100/15 dark:bg-green-200/10"
    >
      <input
        value={input.text}
        maxLength={30}
        onChange={(e) => setInput({ ...input, text: e.target.value })}
        placeholder="ADD A TASK"
        className="h-10 w-full text px-2 bg-transparent rounded font-Ubuntu focus:outline-none"
      />

      <div className="flex items-center justify-between mt-7">
        <div className="flex items-center gap-5">
          <FaRegBell size={20} className="dark:text-white" />
          <BsRepeat size={20} className="dark:text-white" />
          <FaRegCalendar size={20} className="dark:text-white" />
          <select
            value={input.priority}
            onChange={(e) => setInput({ ...input, priority: e.target.value })}
            className="px-2 py-1 rounded focus:outline-none"
          >
            <option value="none">Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button className="bg-green-500/20 text-green-700 px-3 py-1 rounded-md dark:bg-green-600 dark:text-white">
          ADD TASK
        </button>
      </div>
    </form>
  );
};

export default AddTask;
