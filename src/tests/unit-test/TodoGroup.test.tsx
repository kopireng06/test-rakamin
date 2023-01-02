import { render, screen } from "@testing-library/react";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { TodoGroup, TodoGroupProps } from "../../component/todo/TodoGroup";
import { getTodoItemsDescending } from "../../containers/KanbanContainer";
import { Item } from "../../domain/item/itemEntity";

const exampleTodoItems: TodoGroupProps = {
  title: "My Todo",
  description: "Jan - Feb",
  onNewTask: () => {},
  items: [
    {
      id: 324,
      name: "Anythiing",
      done: null,
      todo_id: 89,
      created_at: "2023-01-02T06:20:06.818Z",
      updated_at: "2023-01-02T07:07:05.982Z",
      progress_percentage: 76.0,
      onDragStart: () => {},
      actions: [
        { colorHover: "red", Icon: Pencil, name: "edit", onClick: () => {} },
      ],
    },
    {
      id: 325,
      name: "Web Design",
      done: null,
      todo_id: 89,
      created_at: "2023-01-02T06:20:06.818Z",
      updated_at: "2023-02-02T09:07:05.982Z", // newer
      progress_percentage: 76.0,
      onDragStart: () => {},
      actions: [
        { colorHover: "red", Icon: Pencil, name: "edit", onClick: () => {} },
      ],
    },
  ],
  onDragover: () => {},
  onDrop: () => {},
};

const exampleTodos: Item[] = [
  {
    id: 324,
    name: "Anythiing",
    done: null,
    todo_id: 89,
    created_at: "2023-01-02T06:20:06.818Z",
    updated_at: "2023-01-02T07:07:05.982Z",
    progress_percentage: 76.0,
  },
  {
    id: 325,
    name: "Web Design",
    done: null,
    todo_id: 89,
    created_at: "2023-01-02T06:20:06.818Z",
    updated_at: "2023-02-02T09:07:05.982Z", // newer
    progress_percentage: 76.0,
  },
];

describe("Testing <TodoGroup/> component", () => {
  test("Should render <TodoItem/> as long as the length of the given item todo array", async () => {
    render(<TodoGroup {...exampleTodoItems} />);
    const todoItems = await screen.findAllByTestId(/todo-item/i);

    expect(todoItems).toHaveLength(exampleTodoItems.items?.length ?? 0);
  });

  test("Should render No Task when <TodoGroup/> component don't have an items", async () => {
    render(<TodoGroup {...exampleTodoItems} items={[]} />);
    const todoGroup = await screen.findByTestId("todo-group");

    expect(todoGroup).toHaveTextContent("No Task");
  });

  test("Should render title correctly", async () => {
    render(<TodoGroup {...exampleTodoItems} items={[]} />);
    const todoGroup = await screen.findByTestId("todo-group");

    expect(todoGroup).toHaveTextContent(exampleTodoItems.title);
  });

  test("Should render description correctly", async () => {
    render(<TodoGroup {...exampleTodoItems} items={[]} />);
    const todoGroup = await screen.findByTestId("todo-group");

    expect(todoGroup).toHaveTextContent(exampleTodoItems.description);
  });
});

describe("Testing getTodoItemsDescending()", () => {
  test("Should sort todos correctly", () => {
    const sortedTodos = getTodoItemsDescending(exampleTodos);
    expect(sortedTodos[0].id).toEqual(325);
  });
});
