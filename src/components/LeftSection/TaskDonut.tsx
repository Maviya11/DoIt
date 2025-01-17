import { useSelector } from "react-redux";
import { FaCircleInfo } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { RootState } from "../../app/store";

const TaskDonut = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  // Calculate the circle's circumference
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const donePercentage = Math.round(
    (completedTodos.length / todos.length) * 100
  );

  return (
    <div className="bg-white mt-3 rounded-sm w-[95%] mx-auto py-3 px-5 dark:bg-zinc-800/50 dark:text-white">
      <div className="flex justify-between items-center flex-grow ">
        <h3 className="">Total Tasks</h3>
        <FaCircleInfo color="gray" />{" "}
      </div>
      <div className="text-xl mb-4">{todos.length}</div>
      <hr />

      {/* Donut Segment */}
      <div className="relative h-[120px] w-[120px] mx-auto mt-5">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          {/* Full Circle (Pending Segment) */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgb(0, 0, 0)" /* Black for pending */
            strokeWidth="20"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset="0"
            className="transition-all duration-300 ease-in-out"
          />
          {/* Done Segment */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgb(22, 101, 52)" /* Green for done */
            strokeWidth="20"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - (circumference * donePercentage) / 100
            }
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </div>

      {/* Labels */}
      <div className="flex items-center gap-2 mt-3">
        <GoDotFill className="dark:text-black"/> <span>Pending</span>
        <GoDotFill color="green" /> <span>Done</span>
      </div>
    </div>
  );
};

export default TaskDonut;
