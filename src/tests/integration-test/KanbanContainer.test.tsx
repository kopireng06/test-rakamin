import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { Item } from "../../domain/item/itemEntity";
import { getItems } from "../../domain/item/itemService";
import { getTodos } from "../../domain/todo/todoService";

jest.mock("../../domain/item/itemService");
jest.mock("../../domain/todo/todoService");

const exampleItemsByTodoId: { [key: number]: Item[] } = {
  90: [
    {
      id: 325,
      name: "Web Design",
      done: null,
      todo_id: 90,
      created_at: "2023-01-02T06:20:06.818Z",
      updated_at: "2023-02-02T09:07:05.982Z",
      progress_percentage: 76.0,
    },
  ],
  89: [
    {
      id: 324,
      name: "Anythiing",
      done: null,
      todo_id: 89,
      created_at: "2023-01-02T06:20:06.818Z",
      updated_at: "2023-01-02T07:07:05.982Z",
      progress_percentage: 76.0,
    },
  ],
};

const exampleTodos = [
  {
    id: 89,
    title: "Group Task 3",
    created_by: "81",
    created_at: "2023-01-01T07:51:02.636Z",
    updated_at: "2023-01-01T07:51:02.636Z",
    description: "Januari - Februari",
  },
  {
    id: 90,
    title: "Group Task 4",
    created_by: "81",
    created_at: "2023-01-01T07:51:12.015Z",
    updated_at: "2023-01-01T07:51:12.015Z",
    description: "Maret - April",
  },
];

describe("Testing <KanbanContainer/>", () => {
  test("Edit todo item", async () => {
    const id_item_todo = exampleItemsByTodoId[90][0].id;
    await waitFor(() =>
      (getItems as jest.Mock).mockResolvedValueOnce(exampleItemsByTodoId)
    );
    await waitFor(() =>
      (getTodos as jest.Mock).mockResolvedValue(exampleTodos)
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Web Design")).toBeInTheDocument();
      screen.getByTestId(`action-button-popup-${id_item_todo}`);
    });

    const actionButtonPopup = screen.getByTestId(
      `action-button-popup-${id_item_todo}`
    );
    userEvent.click(actionButtonPopup);
    const editButton = screen.getByText("Edit");
    userEvent.click(editButton);

    const inputTaskName = screen.getByLabelText(
      "Task Name"
    ) as HTMLInputElement;
    fireEvent.change(inputTaskName, { target: { value: "JOGGING" } });
    expect(inputTaskName.value).toBe("JOGGING");

    const inputProgress = screen.getByLabelText("Progress") as HTMLInputElement;
    fireEvent.change(inputProgress, { target: { value: "60" } });
    expect(inputProgress.value).toBe("60");

    const saveButton = screen.getByText("Save Task");
    fireEvent.mouseDown(saveButton);
  });
});
