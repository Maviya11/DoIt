import { useSelector, useDispatch } from "react-redux";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { GoStar, GoStarFill } from "react-icons/go";
import { RootState } from "../../app/store";
import {
  toggleIsCompleted,
  toggleIsImportant,
  setSelectedTodo,
} from "../../features/todos/todoSlice";
import { useContext } from "react";
import { setRightSectionContext } from "../../components/OtherComponents/HomePage";

const TodoList = () => {
  const setIsRightSectionVisible = useContext(setRightSectionContext);

  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  // For sorting the TODOs based on priority
  const priorityOrder: Record<string, number> = {
    high: 1,
    medium: 2,
    low: 3,
    none: 4,
  };

  // Split todos into two arrays: one for pending tasks and one for completed tasks
  const pendingTodos = todos
    .filter((todo) => !todo.isCompleted)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  console.log(pendingTodos);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <div className="dark:text-white">
      {/* Pending todos list */}
      <ul>
        <h3 className="text-lg font-medium ml-4 mb-2">Pending TODOs</h3>
        {pendingTodos.map((item, index) => (
          <div key={index}>
            <hr />
            <li className="flex items-center justify-between px-2 py-5 border-t border-slate-300">
              <div className="flex flex-grow items-center gap-10">
                {item.isCompleted ? (
                  <FaCheckSquare
                    size={21}
                    color="green"
                    onClick={() => {
                      dispatch(toggleIsCompleted(item.id));
                    }}
                  />
                ) : (
                  <MdCheckBoxOutlineBlank
                    onClick={() => {
                      dispatch(toggleIsCompleted(item.id));
                    }}
                    size={22}
                  />
                )}
                <div className="flex flex-grow items-center gap-2">
                  <div
                    className={`h-6 w-[6px] rounded-full ${
                      item.priority === "high"
                        ? "bg-red-500"
                        : item.priority === "medium"
                        ? "bg-yellow-500"
                        : item.priority === "low"
                        ? "bg-green-500"
                        : "bg-black"
                    }`}
                  ></div>
                  <p
                    onClick={() => {
                      if (setIsRightSectionVisible)
                        setIsRightSectionVisible(true);
                      dispatch(setSelectedTodo(item.id));
                    }}
                    className="flex-grow"
                  >
                    {item.text}
                  </p>
                </div>
              </div>
              {item.isImportant ? (
                <GoStarFill
                  size={22}
                  className="dark:text-white"
                  onClick={() => dispatch(toggleIsImportant(item.id))}
                />
              ) : (
                <GoStar
                  size={22}
                  onClick={() => dispatch(toggleIsImportant(item.id))}
                />
              )}
            </li>
          </div>
        ))}
      </ul>

      {/* Completed todos list */}
      <ul className="mt-14">
        <h3 className="text-lg font-medium ml-4 mb-2">Completed TODOs</h3>
        {completedTodos.map((item, index) => (
          <div key={index}>
            <hr className="border border-gray-300" />
            <li className="flex items-center justify-between px-2 py-3">
              <div className="flex flex-grow items-center gap-10">
                <FaCheckSquare
                  size={21}
                  color="green"
                  onClick={() => dispatch(toggleIsCompleted(item.id))}
                />
                <p
                  onClick={() => {
                    if (setIsRightSectionVisible)
                      setIsRightSectionVisible(true);
                    dispatch(setSelectedTodo(item.id));
                  }}
                  className="line-through flex-grow"
                >
                  {item.text}
                </p>
              </div>
              {item.isImportant ? (
                <GoStarFill
                  size={22}
                  onClick={() => dispatch(toggleIsImportant(item.id))}
                />
              ) : (
                <GoStar
                  size={22}
                  onClick={() => dispatch(toggleIsImportant(item.id))}
                />
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
