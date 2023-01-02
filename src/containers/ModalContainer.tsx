import { Box, Button, Fade, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { ReactComponent as Cross } from "../assets/icons/cross.svg";
import { ModalEntity } from "../domain/modal/modalEntity";
import { ModalContext } from "../domain/modal/ModalContext";
import { DeleteKanbanItem } from "../component/modal/DeleteKanbanItem";
import { ReactComponent as Exclamation } from "../assets/icons/exclamation.svg";
import {
  CreateTodoItemForm,
  UpdateTodoItemForm,
} from "../component/modal/FormKanbanItem";

const renderModal = (modalProps: ModalEntity) => {
  switch (modalProps.name) {
    case "Delete Task":
      return <DeleteKanbanItem {...modalProps.props} />;
    case "Create Task":
      return <CreateTodoItemForm {...modalProps.props} />;
    case "Edit Task":
      return <UpdateTodoItemForm {...modalProps.props} />;
  }
};

const renderIcon = (modalProps: ModalEntity) => {
  switch (modalProps.name) {
    case "Delete Task":
      return <Exclamation />;
  }
  return null;
};

const ModalContainer = () => {
  const { modal, setModal } = useContext(ModalContext);
  if (modal.name === null) return null;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      background="blackAlpha.600"
      position="fixed"
      top="0"
      zIndex="overlay"
    >
      <Fade in={!!modal.name}>
        <Box
          width="420px"
          padding="24px"
          borderRadius="10px"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          background="white"
        >
          <Flex
            justifyContent="space-between"
            minHeight="28px"
            alignItems="center"
            marginBottom="16px"
          >
            <Flex alignItems="center" gap="12px">
              {renderIcon(modal)}
              <Text fontSize="18px" fontWeight="700">
                {modal.name}
              </Text>
            </Flex>
            <Button
              background="white"
              padding="0"
              onClick={() => setModal({ name: null })}
            >
              <Cross />
            </Button>
          </Flex>
          {renderModal(modal)}
        </Box>
      </Fade>
    </Flex>
  );
};

export { ModalContainer };
