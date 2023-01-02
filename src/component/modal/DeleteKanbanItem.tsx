import { Button, Flex, Text, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteItem } from "../../domain/item/itemService";
import { ModalContext } from "../../domain/modal/ModalContext";

type DeleteKanbanItemProps = {
  id_item: number;
  id_todo: number;
};

const DeleteKanbanItem = ({ id_item, id_todo }: DeleteKanbanItemProps) => {
  const { setModal } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const handleSuccessDeleteItem = () => {
    setModal({ name: null });
    queryClient.invalidateQueries("get-todo-items");
  };

  const { mutate } = useMutation("delete-item", deleteItem, {
    onSuccess: handleSuccessDeleteItem,
  });

  return (
    <Box>
      <Text fontWeight="400" fontSize="14px">
        Are you sure want to delete this task? your action can’t be reverted.
      </Text>
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
          _hover={{ background: "#E11428" }}
          fontWeight="700"
          fontSize="14px"
          border="1px solid #E0E0E0"
          boxShadow="0px 1px 2px rgba(0, 0, 0, 0.12)"
          borderRadius="8px"
          width="76px"
          height="32px"
          background="#E11428"
          color="white"
          onClick={() => mutate({ id_item, id_todo })}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export { DeleteKanbanItem };
export type { DeleteKanbanItemProps };
