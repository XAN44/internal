"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(); // ปิด modal เมื่อยืนยัน
  };

  return (
    <>
      <Button variant="bordered" onPress={onOpen}>
        {children}
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onOpen) => (
            <>
              <ModalHeader>
                Are you sure you want to delete this course?
              </ModalHeader>
              <ModalBody>This actions cannot be undone</ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={onOpenChange}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  variant="shadow"
                  className="bg-destructive/90">
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
