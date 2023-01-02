import { fetcherObj } from "../../utils/fetcher";
import { CreateItem, Item, UpdateItem, DeleteItem } from "./itemEntitiy";

const getItems = async (
  idTodos: number[]
): Promise<{ [key: number]: Item[] }> => {
  const itemPromises = idTodos.map((idTodo) => {
    return fetcherObj.fetcher<Item[]>(`/todos/${idTodo}/items`, {
      method: "GET",
    });
  });

  return Promise.all(itemPromises).then((itemPromise) => {
    return itemPromise.reduce(
      (prev, currentItems, currentIndex) => ({
        ...prev,
        [idTodos[currentIndex]]: currentItems,
      }),
      {}
    );
  });
};

const createItem = async ({
  id_todo,
  name,
  progress_percentage,
}: CreateItem) => {
  return fetcherObj.fetcher(`/todos/${id_todo}/items`, {
    method: "POST",
    body: JSON.stringify({ name, progress_percentage }),
  });
};

const updateItem = async ({
  id_item,
  id_todo,
  progress_percentage,
  target_todo_id = id_todo,
  name,
}: UpdateItem) => {
  return fetcherObj.fetcher(`/todos/${id_todo}/items/${id_item}`, {
    method: "PATCH",
    body: JSON.stringify({
      name,
      target_todo_id: target_todo_id,
      progress_percentage,
    }),
  });
};

const deleteItem = async ({ id_item, id_todo }: DeleteItem) => {
  return fetcherObj.fetcher(`/todos/${id_todo}/items/${id_item}`, {
    method: "DELETE",
  });
};

export { getItems, createItem, updateItem, deleteItem };
