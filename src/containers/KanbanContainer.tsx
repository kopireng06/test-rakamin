import { BadgeProps, BoxProps, Flex } from "@chakra-ui/react";
import { TodoGroup } from "../component/todo/TodoGroup";
import { ReactComponent as ArrowRight } from "../assets/icons/arrowRight.svg";
import { ReactComponent as ArrowLeft } from "../assets/icons/arrowLeft.svg";
import { ReactComponent as Pencil } from "../assets/icons/pencil.svg";
import { ReactComponent as Trash } from "../assets/icons/trash.svg";
import { DragEventHandler, useContext, useMemo } from "react";
import { ModalContext } from "../domain/modal/ModalContext";
import { useMutation, useQueryClient } from "react-query";
import { updateItem } from "../domain/item/itemService";
import { TodoItemProps } from "../component/todo/TodoItem";
import { useGetTodos } from "../domain/todo/todoHooks";
import { useGetTodoItems } from "../domain/item/itemHooks";
import { Item, UpdateItem } from "../domain/item/itemEntitiy";

type TodoGroupColors = {
  wrapperProps?: BoxProps;
  titleProps?: BadgeProps;
}[];

const todoGroupColors: TodoGroupColors = [
  {
    wrapperProps: { background: "#F7FEFF", border: "1px solid #01959F" },
    titleProps: { color: "#01959F", border: "1px solid #4DB5BC" },
  },
  {
    wrapperProps: { background: "#FFFCF5", border: "1px solid #FEEABC" },
    titleProps: { color: "#FA9810", border: "1px solid #FEEABC" },
  },
  {
    wrapperProps: { background: "#FFFAFA", border: "1px solid #F5B1B7" },
    titleProps: { color: "#E11428", border: "1px solid #F5B1B7" },
  },
  {
    wrapperProps: { background: "#F8FBF9", border: "1px solid #B8DBCA" },
    titleProps: { color: "#43936C", border: "1px solid #B8DBCA" },
  },
];

const KanbanContainer = () => {
  const { setModal } = useContext(ModalContext);
  const queryClient = useQueryClient();
  const { data: todosGroupData } = useGetTodos();
  const droppedKey = "droppedItem";

  const idTodos = useMemo(() => {
    return todosGroupData?.map((todo) => todo.id) ?? [];
  }, [todosGroupData]);

  const { data: itemsData } = useGetTodoItems(idTodos);

  const handleSuccessUpdateItem = () => {
    queryClient.invalidateQueries("get-todo-items");
  };

  const { mutate: mutateUpdate } = useMutation("update-item", updateItem, {
    onSuccess: handleSuccessUpdateItem,
  });

  const itemsDataWithActions = useMemo(() => {
    const newItems = { ...itemsData };
    for (const property in newItems) {
      newItems[property] = getTodoItemsDescending(newItems[property]);
    }

    idTodos.forEach((idTodo, index) => {
      newItems[idTodo] = newItems[idTodo].map((item) => {
        const { id, name, progress_percentage, todo_id } = item;
        const basicUpdateBody = {
          id_item: id,
          name,
          progress_percentage,
          id_todo: todo_id,
        };

        const onDragStart: DragEventHandler<HTMLDivElement> = (event) => {
          event.dataTransfer.setData(
            droppedKey,
            JSON.stringify(basicUpdateBody)
          );
        };

        let actions = [];

        if (index !== 0) {
          actions.push({
            name: "Move Left",
            onClick: () =>
              mutateUpdate({
                ...basicUpdateBody,
                target_todo_id: idTodos[index - 1],
              }),
            Icon: ArrowLeft,
            colorHover: "#01959F",
          });
        }
        if (index !== idTodos.length - 1) {
          actions.push({
            name: "Move Right",
            onClick: () =>
              mutateUpdate({
                ...basicUpdateBody,
                target_todo_id: idTodos[index + 1],
              }),
            Icon: ArrowRight,
            colorHover: "#01959F",
          });
        }
        actions = [
          ...actions,
          {
            name: "Edit",
            onClick: () =>
              setModal({
                name: "Edit Task",
                props: basicUpdateBody,
              }),
            Icon: Pencil,
            colorHover: "#01959F",
          },
          {
            name: "Delete",
            onClick: () =>
              setModal({
                name: "Delete Task",
                props: { id_item: item.id, id_todo: todo_id },
              }),
            Icon: Trash,
            colorHover: "#E11428",
          },
        ];

        return { ...item, actions, onDragStart };
      });
    });

    return newItems as { [key: number]: TodoItemProps[] };
  }, [itemsData]);

  const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  const onDrop = (id_todo: number): DragEventHandler<HTMLDivElement> => {
    return (event) => {
      event.preventDefault();
      const droppedItem: UpdateItem = JSON.parse(
        event.dataTransfer?.getData(droppedKey)
      );
      mutateUpdate({ ...droppedItem, target_todo_id: id_todo });
    };
  };

  return (
    <Flex gap="24px" padding="24px" alignItems="flex-start">
      {todosGroupData?.map(({ description, id, title }, index) => (
        <TodoGroup
          key={`todo-group-${id}`}
          wrapperProps={{ flex: 1, ...todoGroupColors[index].wrapperProps }}
          titleProps={{ ...todoGroupColors[index].titleProps }}
          description={description}
          title={title}
          items={itemsDataWithActions[id]}
          onNewTask={() =>
            setModal({ name: "Create Task", props: { id_todo: id } })
          }
          onDrop={onDrop(id)}
          onDragover={onDragOver}
        />
      ))}
    </Flex>
  );
};

const getTodoItemsDescending = (todoItems: Item[]) => {
  todoItems.sort((todoItem1, todoItem2) => {
    const value =
      new Date(todoItem2.updated_at).getTime() -
      new Date(todoItem1.updated_at).getTime();
    return value;
  });
  return todoItems;
};

export { KanbanContainer, getTodoItemsDescending };
