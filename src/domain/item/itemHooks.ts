import { useQuery } from "react-query";
import { getItems } from "./itemService";

const useGetTodoItems = (idTodos: number[]) => {
  return useQuery(["get-todo-items", idTodos], () => getItems(idTodos), {
    enabled: !!idTodos.length,
  });
};

export { useGetTodoItems };
