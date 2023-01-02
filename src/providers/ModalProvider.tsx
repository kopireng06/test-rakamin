import { useState } from "react";
import { ModalEntity } from "../domain/modal/modalEntity";
import { ModalContext } from "../domain/modal/ModalContext";
import { ModalContainer } from "../containers/ModalContainer";

const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [modal, setModal] = useState<ModalEntity>({ name: null });

  return (
    <ModalContext.Provider
      value={{ modal, setModal: setModal as (modalProps: ModalEntity) => {} }}
    >
      <ModalContainer />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider };
