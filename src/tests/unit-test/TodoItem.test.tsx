import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem, TodoItemProps } from "../../component/todo/TodoItem";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import userEvent from "@testing-library/user-event";

const exampleTodoItem: TodoItemProps = {
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
};

describe("Testing <TodoItem/> component", () => {
  test("Should render name of todo item", () => {
    render(<TodoItem {...exampleTodoItem} />);
    expect(screen.getByText(exampleTodoItem.name)).toBeInTheDocument();
  });

  test("Should render progress percentage of todo item", () => {
    render(<TodoItem {...exampleTodoItem} />);
    expect(
      screen.getByText(`${Math.round(exampleTodoItem.progress_percentage)}%`)
    ).toBeInTheDocument();
  });

  test("Should show action list when click action button popup", () => {
    render(<TodoItem {...exampleTodoItem} />);

    const actionButtonPopup = screen.getByTestId(
      `action-button-popup-${exampleTodoItem.id}`
    );
    userEvent.click(actionButtonPopup);

    expect(
      screen.getByText(exampleTodoItem.actions[0].name)
    ).toBeInTheDocument();
  });

  test("Should show correct color when hover action button", () => {
    render(<TodoItem {...exampleTodoItem} />);

    const actionButtonPopup = screen.getByTestId(
      `action-button-popup-${exampleTodoItem.id}`
    );
    userEvent.click(actionButtonPopup);

    const actionButton = screen.getByTestId("action-button");
    fireEvent.mouseOver(actionButton);

    expect(actionButton).toHaveStyle({
      color: exampleTodoItem.actions[0].colorHover,
    });
  });
});
