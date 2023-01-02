import {
  Box,
  BoxProps,
  Button,
  Fade,
  Flex,
  FlexProps,
  Progress,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as ChecklistLogo } from "../../assets/icons/checklist.svg";
import { ReactComponent as SettingLogo } from "../../assets/icons/setting.svg";
import { DragEventHandler, useRef, useState } from "react";
import { useOutsideClick } from "../../utils/useOutsiderClick";
import { Item } from "../../domain/item/itemEntitiy";

type TodoItemProps = Item & {
  actions: ActionButtonProps[];
  wrapperProps?: BoxProps;
  onDragStart: DragEventHandler<HTMLDivElement>;
};

type ListActionButtonProps = {
  wrapperProps?: FlexProps;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actions: ActionButtonProps[];
};

type ActionButtonProps = {
  name: string;
  onClick: () => void;
  Icon: React.FunctionComponent;
  colorHover: string;
};

const ActionButton = ({
  name,
  onClick,
  Icon,
  colorHover,
}: ActionButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Button
      alignItems="center"
      gap="22px"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      background="white"
      justifyContent="flex-start"
      padding="0"
      _hover={{ background: "white" }}
      _focus={{ background: "white" }}
      height="auto"
      data-testid="action-button"
      color={isHover ? colorHover : "#000000"}
    >
      <Flex minWidth="20px" justifyContent="center">
        <Icon />
      </Flex>
      <Text fontWeight="600" fontSize="14px">
        {name}
      </Text>
    </Button>
  );
};

const ListActionButton = ({
  isOpen,
  wrapperProps,
  actions,
  setIsOpen,
}: ListActionButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  if (isOpen)
    return (
      <Fade ref={ref} in={isOpen} transition={{ enter: { duration: 0.2 } }}>
        <Flex
          position="absolute"
          flexDirection="column"
          width="320px"
          paddingX="22px"
          paddingY="14px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
          borderRadius="8px"
          background="white"
          gap="12px"
          {...wrapperProps}
        >
          {actions.map(({ name, onClick, Icon, colorHover }) => (
            <ActionButton
              key={name}
              name={name}
              onClick={() => {
                setIsOpen(false);
                onClick();
              }}
              Icon={Icon}
              colorHover={colorHover}
            />
          ))}
        </Flex>
      </Fade>
    );
  return null;
};

const TodoItem = ({
  name,
  progress_percentage,
  actions,
  wrapperProps,
  onDragStart,
  id,
}: TodoItemProps) => {
  const [isOpenAction, setIsOpenAction] = useState(false);

  return (
    <Box
      padding="16px"
      background="#FAFAFA"
      border="1px solid #E0E0E0"
      borderRadius="4px"
      cursor="pointer"
      draggable
      onDragStart={onDragStart}
      data-testid={`todo-item-${id}`}
      {...wrapperProps}
    >
      <Text
        fontWeight="700"
        fontSize="14px"
        lineHeight="24px"
        className="todo-item-name"
      >
        {name}
      </Text>
      <Box marginY="8px" height="1px" borderBottom="1px dashed #E0E0E0" />
      <Flex width="full" alignItems="center">
        <Progress
          position="static"
          flex="1"
          value={progress_percentage}
          borderRadius="9999px"
          height="16px"
          variant={progress_percentage === 100 ? "finished" : "onprogress"}
        />
        <Box marginLeft="15px" marginRight="30px">
          {progress_percentage === 100 ? (
            <ChecklistLogo />
          ) : (
            <Text fontWeight="400" fontSize="12px" color="#757575">
              {progress_percentage}%
            </Text>
          )}
        </Box>
        <Button
          position="static"
          _hover={{ background: "#EDEDED" }}
          background={isOpenAction ? "#EDEDED" : "#FAFAFA"}
          padding="0"
          size="sm"
          minWidth="fit-content"
          height="fit-content"
          onClick={() => setIsOpenAction(!isOpenAction)}
          data-testid={`action-button-popup-${id}`}
        >
          <SettingLogo />
        </Button>
        <Box position="relative" bottom="5" right="5">
          <ListActionButton
            wrapperProps={{ top: 9 }}
            isOpen={isOpenAction}
            setIsOpen={setIsOpenAction}
            actions={actions}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export { TodoItem };
export type { ActionButtonProps, TodoItemProps };
