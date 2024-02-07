import React, {
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import SmoothModal from "../SmoothModal";

export type ModalFunction = (modalContent: ReactNode) => void;

export const ModalContext = createContext<{
  useModal: ModalFunction;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}>({ useModal: () => null, setOpen: () => null });

interface Props {
  children: ReactNode;
}

function ModalProvider({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>("");

  const useModal = (modalContent: ReactNode) => {
    setOpen(true);
    setModalContent(modalContent);
  };

  return (
    <ModalContext.Provider value={{ useModal, setOpen }}>
      {children}
      <SmoothModal open={open} setOpen={setOpen}>
        {modalContent}
      </SmoothModal>
    </ModalContext.Provider>
  );
}

export default ModalProvider;
