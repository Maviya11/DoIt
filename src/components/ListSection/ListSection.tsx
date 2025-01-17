import AddTask from "./AddTask";
import TodoList from "./TodoList";

const ListSection = () => {
  return (
    <div className="flex-grow max-w-5xl mx-auto dark:bg-zinc-800">
      <AddTask />
      <TodoList />
    </div>
  );
};

export default ListSection;
