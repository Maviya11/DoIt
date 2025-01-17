import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  isImportant: boolean;
  priority: string;
}

interface TodoState {
  todos: Todo[];
  selectedTodoId: string;
}

// Function to load todos from localStorage
const loadTodosFromLocalStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem("Todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const initialState: TodoState = {
  todos: loadTodosFromLocalStorage(),
  selectedTodoId: "1",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
      localStorage.setItem("Todos", JSON.stringify(state.todos));
    },
    toggleIsImportant: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.isImportant = !todo.isImportant;
      localStorage.setItem("Todos", JSON.stringify(state.todos));
    },
    toggleIsCompleted: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.isCompleted = !todo.isCompleted;
      localStorage.setItem("Todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("Todos", JSON.stringify(state.todos));
    },
    setSelectedTodo: (state, action: PayloadAction<string>) => {
      state.selectedTodoId = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleIsImportant,
  toggleIsCompleted,
  deleteTodo,
  setSelectedTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
