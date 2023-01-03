import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { CreateItem, UpdateItem } from "../../domain/item/itemEntity";
import { createItem, updateItem } from "../../domain/item/itemService";
import { ModalContext } from "../../domain/modal/ModalContext";

export type CreateTodoItemFormProps = Pick<CreateItem, "id_todo">;

export type UpdateTodoItemFormProps = Pick<
  UpdateItem,
  "id_item" | "id_todo" | "name" | "progress_percentage"
>;

const CreateTodoItemForm = ({ id_todo }: CreateTodoItemFormProps) => {
  const { setModal } = useContext(ModalContext);
  const [formValue, setFormValue] = useState({
    name: "",
    progress_percentage: 0,
  });

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries("get-todo-items");
    setModal({ name: null });
  };

  const { mutate } = useMutation(`create-item-${id_todo}`, createItem, {
    onSuccess: handleSuccess,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => {
      const targetName = e.target.name;
      const targetValue = e.target.value;

      const newValue =
        targetName === "progress_percentage"
          ? targetValue.includes("%")
            ? Number(targetValue.replace(/%/g, "").replace(/\D/g, ""))
            : Number(targetValue.substring(0, targetValue.length - 1))
          : targetValue;

      return {
        ...prev,
        [e.target.name]: newValue > 100 ? prev.progress_percentage : newValue,
      };
    });
  };

  return (
    <FormControl>
      <FormLabel fontWeight="700" fontSize="12px" color="#404040">
        Task Name
      </FormLabel>
      <Input
        name="name"
        type="text"
        borderRadius="8px"
        border="2px solid #EDEDED"
        height="36px"
        marginBottom="16px"
        value={formValue.name}
        onChange={handleChange}
      />
      <FormLabel fontWeight="700" fontSize="12px" color="#404040">
        Progress
      </FormLabel>
      <Input
        name="progress_percentage"
        type="text"
        borderRadius="8px"
        border="2px solid #EDEDED"
        height="36px"
        width="143px"
        value={`${formValue.progress_percentage}%`}
        onChange={handleChange}
      />
      <Flex justifyContent="flex-end" marginTop="16px" gap="10px">
        <Button
          fontWeight="700"
          fontSize="14px"
          background="white"
          border="1px solid #E0E0E0"
          boxShadow="0px 1px 2px rgba(0, 0, 0, 0.12)"
          borderRadius="8px"
          width="76px"
          height="32px"
          onClick={() => setModal({ name: null })}
        >
          Cancel
        </Button>
        <Button
          _hover={{ background: "#01959F" }}
          fontWeight="700"
          fontSize="14px"
          border="1px solid #E0E0E0"
          boxShadow="0px 1px 2px rgba(0, 0, 0, 0.12)"
          borderRadius="8px"
          width="97px"
          height="32px"
          background="#01959F"
          color="white"
          onClick={() => mutate({ id_todo, ...formValue })}
        >
          Save Task
        </Button>
      </Flex>
    </FormControl>
  );
};

const UpdateTodoItemForm = ({
  id_todo,
  id_item,
  name,
  progress_percentage,
}: UpdateTodoItemFormProps) => {
  const { setModal } = useContext(ModalContext);
  const [formValue, setFormValue] = useState({
    name,
    progress_percentage,
  });

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries("get-todo-items");
    setModal({ name: null });
  };

  const { mutate } = useMutation(
    `update-item-${id_todo}-${id_item}`,
    updateItem,
    { onSuccess: handleSuccess }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => {
      const targetName = e.target.name;
      const targetValue = e.target.value;

      const newValue =
        targetName === "progress_percentage"
          ? targetValue.includes("%")
            ? Number(targetValue.replace(/%/g, "").replace(/\D/g, ""))
            : Number(targetValue.substring(0, targetValue.length - 1))
          : targetValue;

      return {
        ...prev,
        [e.target.name]: newValue > 100 ? prev.progress_percentage : newValue,
      };
    });
  };

  return (
    <FormControl>
      <FormLabel fontWeight="700" fontSize="12px" color="#404040">
        Task Name
      </FormLabel>
      <Input
        name="name"
        type="text"
        borderRadius="8px"
        border="2px solid #EDEDED"
        height="36px"
        marginBottom="16px"
        value={formValue.name}
        onChange={handleChange}
      />
      <FormLabel fontWeight="700" fontSize="12px" color="#404040">
        Progress
      </FormLabel>
      <Input
        name="progress_percentage"
        type="text"
        borderRadius="8px"
        border="2px solid #EDEDED"
        height="36px"
        width="143px"
        value={`${formValue.progress_percentage}%`}
        onChange={handleChange}
      />
      <Flex justifyContent="flex-end" marginTop="16px" gap="10px">
        <Button
          fontWeight="700"
          fontSize="14px"
          background="white"
          border="1px solid #E0E0E0"
          boxShadow="0px 1px 2px rgba(0, 0, 0, 0.12)"
          borderRadius="8px"
          width="76px"
          height="32px"
          onClick={() => setModal({ name: null })}
        >
          Cancel
        </Button>
        <Button
          _hover={{ background: "#01959F" }}
          fontWeight="700"
          fontSize="14px"
          border="1px solid #E0E0E0"
          boxShadow="0px 1px 2px rgba(0, 0, 0, 0.12)"
          borderRadius="8px"
          width="97px"
          height="32px"
          background="#01959F"
          color="white"
          onClick={() => mutate({ ...formValue, id_item, id_todo })}
        >
          Save Task
        </Button>
      </Flex>
    </FormControl>
  );
};

export { CreateTodoItemForm, UpdateTodoItemForm };
