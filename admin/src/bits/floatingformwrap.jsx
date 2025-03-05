import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";

export default function FloatingFormWrapper({ isOpen, onClose, children }) {
  return (
    <Modal
      isCentered
      size="4xl"
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(180deg)"
      />
      <ModalContent
        borderWidth={2}
        borderStyle="solid"
        borderColor="slate.500"
        bg="chakra-body-bg"
        maxH={"88vh"}
        overflow={"auto"}
        className="content">
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
