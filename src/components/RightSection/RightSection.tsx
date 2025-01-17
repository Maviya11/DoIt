import { useDispatch, useSelector } from "react-redux";
import { GoStar, GoStarFill } from "react-icons/go";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa6";
import { BsRepeat } from "react-icons/bs";
import { FaCheckSquare, FaRegCalendar } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { RootState } from "../../app/store";
import {
  deleteTodo,
  toggleIsCompleted,
  toggleIsImportant,
} from "../../features/todos/todoSlice";
import { useContext, useEffect, useState } from "react";
import { setRightSectionContext } from "../../components/OtherComponents/HomePage";
import { generateTaskSuggestion } from "../../services/api-service";

interface Props {
  isRightSectionVisible: boolean;
}

const RightSection = ({ isRightSectionVisible }: Props) => {
  const setIsRightSectionVisible = useContext(setRightSectionContext);

  const todos = useSelector((state: RootState) => state.todos);
  const selectedTodoId = useSelector(
    (state: RootState) => state.selectedTodoId
  );

  const selectedTodo = todos.find((todo) => todo.id === selectedTodoId);
  const dispatch = useDispatch();

  const [taskSuggstion, setTaskSuggestion] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // Generate suggestion related to task
  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);
      generateTaskSuggestion(selectedTodo?.text)
        .then((res) => {
          setTaskSuggestion(res);
          setIsLoading(false);
        })
        .catch(() => {
          setTaskSuggestion("Unable to load suggestions");
          setIsLoading(false);
        });
    }
  }, [selectedTodo]);

  return (
    <div
      className={`h-[calc(100vh-40px)] w-96 bg-green-100 flex flex-col justify-between absolute transition-all md:static dark:bg-zinc-700 dark:text-white ${
        isRightSectionVisible
          ? "right-0 z-10 md:w-[30%]"
          : "-right-full -z-10 md:w-0 md:p-0 md:overflow-hidden 2xl:w-[30%]"
      }`}
    >
      <ul className="pl-4 mt-10">
        <li className="flex items-center justify-between px-2 py-7 border-t border-slate-300">
          <div className="flex flex-grow items-center gap-10">
            {selectedTodo?.isCompleted ? (
              <FaCheckSquare
                size={21}
                color="green"
                onClick={() => {
                  if (selectedTodo) {
                    dispatch(toggleIsCompleted(selectedTodo.id));
                  }
                }}
              />
            ) : (
              <MdCheckBoxOutlineBlank
                onClick={() => {
                  if (selectedTodo) {
                    dispatch(toggleIsCompleted(selectedTodo.id));
                  }
                }}
                size={22}
              />
            )}
            <p className="text-lg flex-grow">{selectedTodo?.text}</p>
          </div>
          {selectedTodo?.isImportant ? (
            <GoStarFill
              size={22}
              onClick={() => dispatch(toggleIsImportant(selectedTodo.id))}
            />
          ) : (
            <GoStar
              size={22}
              onClick={() => {
                if (selectedTodo) {
                  dispatch(toggleIsImportant(selectedTodo.id));
                }
              }}
            />
          )}
        </li>
        <li className="border-t border-slate-300 py-4 px-2 flex gap-10">
          <HiOutlinePlus size={22} />
          <span>Add Step</span>
        </li>
        <li className="border-t border-slate-300 py-4 px-2 flex gap-10">
          <FaRegBell size={22} />
          <span>Set Reminder</span>
        </li>
        <li className="border-t border-slate-300 py-4 px-2 flex gap-10">
          <FaRegCalendar size={22} />
          <span>Add Due Date</span>
        </li>
        <li className="border-t border-slate-300 py-4 px-2 flex gap-10">
          <BsRepeat size={22} />
          <span>Repeat</span>
        </li>
        <li className="border-t border-slate-300 py-4 pr-2 pl-16 text-gray-500 dark:text-gray-400">
          <span>Add Notes</span>
        </li>
        <li className="border-t border-slate-300 py-4 px-2 text-gray-500 dark:text-gray-400">
          {isLoading ? (
            // Skeleton to show when the task suggestion is loading...
            <div className="p-4 w-full bg-slate-200 rounded-md">
              <div className="h-2 bg-slate-400 rounded-md"></div>
            </div>
          ) : (
            <span>{taskSuggstion}</span>
          )}
        </li>
      </ul>
      <div className="pb-8 px-5 flex justify-between items-center">
        <RxCross1
          onClick={() => {
            if (setIsRightSectionVisible) setIsRightSectionVisible(false);
          }}
          size={22}
          className="box-content cursor-pointer p-1"
        />
        <span className="text-gray-500 dark:text-gray-400">Created Today</span>
        <MdDelete
          size={26}
          className="box-content cursor-pointer p-1"
          onClick={() => {
            if (selectedTodo) dispatch(deleteTodo(selectedTodo.id));
            if (setIsRightSectionVisible) setIsRightSectionVisible(false);
          }}
        />
      </div>
    </div>
  );
};

export default RightSection;
