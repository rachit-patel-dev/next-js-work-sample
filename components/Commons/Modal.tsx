import React from "react";

// * Third Party
import { Modal } from "flowbite-react";

interface MyModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle?: string;
  modalBody: React.ReactNode | React.ReactElement;
  onClose?: () => void;
}

const MyModal = ({
  openModal,
  setOpenModal,
  modalTitle,
  modalBody,
  onClose,
}: MyModalProps) => {
  return (
    <>
      <Modal
        show={openModal}
        size="3xl"
        popup
        onClose={onClose ? onClose : () => setOpenModal(false)}
      >
        <Modal.Header className="p-4">
          <h4>{modalTitle}</h4>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;
