import { createContext } from "react";
import { ModalEntity } from "./modalEntity";

type ModalContextEntity = {
  modal: ModalEntity;
  setModal: (modalProps: ModalEntity) => void;
};

const ModalContext = createContext<ModalContextEntity>({
  modal: { name: null },
  setModal: (modalProps) => {},
});

export { ModalContext };
