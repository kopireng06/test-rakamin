import { fetcherObj } from "../../utils/fetcher";
import { Todo } from "./todoEntity";

const getTodos = async () => {
  return fetcherObj.fetcher<Todo[]>("/todos", { method: "GET" });
};

export { getTodos };
