import { useQuery } from "react-query";
import { getTodos } from "./todoService";

const useGetTodos = () => {
  return useQuery("get-todos", getTodos);
};

export { useGetTodos };
