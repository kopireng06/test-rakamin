type Item = {
  id: number;
  name: string;
  done: null;
  todo_id: number;
  created_at: string;
  updated_at: string;
  progress_percentage: number;
};

type CreateItem = {
  id_todo: number;
  name: string;
  progress_percentage: number;
};

type UpdateItem = {
  id_todo: number;
  id_item: number;
  name: string;
  progress_percentage: number;
  target_todo_id?: number;
};

type DeleteItem = {
  id_todo: number;
  id_item: number;
};

export type { Item, CreateItem, UpdateItem, DeleteItem };
