import {
  Badge,
  BadgeProps,
  Box,
  BoxProps,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { TodoItem, TodoItemProps } from "./TodoItem";
import { ReactComponent as PlusCircle } from "../../assets/icons/plusCircle.svg";
import { DragEventHandler } from "react";

type TodoGroupProps = {
  title: string;
  description: string;
  onNewTask: () => void;
  items?: TodoItemProps[];
  wrapperProps?: BoxProps;
  titleProps?: BadgeProps;
  onDragover: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
};

const TodoGroup = ({
  description,
  title,
  wrapperProps,
  titleProps,
  items,
  onNewTask,
  onDragover,
  onDrop,
}: TodoGroupProps) => {
  return (
    <Box
      background="#F7FEFF"
      border="1px solid #01959F"
      borderRadius="4px"
      padding="16px"
      onDragOver={onDragover}
      onDrop={onDrop}
      data-testid="todo-group"
      {...wrapperProps}
    >
      <Badge
        color="#01959F"
        border="1px solid #01959F"
        fontSize="12px"
        padding="2px 8px"
        background="#F7FEFF"
        borderRadius="4px"
        fontWeight="400"
        textTransform="none"
        {...titleProps}
      >
        {title}
      </Badge>
      <Text marginY="8px" fontSize="12px" fontWeight="700">
        {description}
      </Text>
      <Flex flexDirection="column" gap="12px">
        {!!items?.length ? (
          items.map((item) => <TodoItem key={item.id} {...item} />)
        ) : (
          <Box
            padding="8px 16px"
            background="#FAFAFA"
            border="1px solid #E0E0E0"
            borderRadius="4px"
            fontSize="14px"
            fontWeight="400"
            color="#757575"
            data-testid="no-task-item"
          >
            No Task
          </Box>
        )}
      </Flex>
      <Button
        position="static"
        marginTop="8px"
        height="auto"
        background="inherit"
        padding="0"
        _hover={{ background: "inherit" }}
        _focus={{ background: "inherit" }}
        onClick={onNewTask}
      >
        <PlusCircle />
        <Text fontWeight="400" fontSize="12px" as="span" marginLeft="7px">
          New Task
        </Text>
      </Button>
    </Box>
  );
};

export { TodoGroup };
export type { TodoGroupProps };
