import {
  UpdateTodoItemFormProps,
  CreateTodoItemFormProps,
} from "../../component/modal/FormKanbanItem";

type ModalEntity =
  | { name: null }
  | {
      name: "Edit Task";
      props: UpdateTodoItemFormProps;
    }
  | {
      name: "Delete Task";
      props: {
        id_item: number;
        id_todo: number;
      };
    }
  | {
      name: "Create Task";
      props: CreateTodoItemFormProps;
    };

export type { ModalEntity };
