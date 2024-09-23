"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Badge,
} from "@nextui-org/react";
import { Edit, X } from "lucide-react";
import { useState } from "react";
import { boolean } from "zod";
import { FileUpload } from "../../fileUpload";

interface IsOpen {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  initialState: {
    id: string;
    username: string | null;
    name: string | null;
    last: string | null;
    role: string | null;
    email: string | null;
    image: string | null;
    Department: {
      departname: string;
    } | null;
  };
}

function IsSetting({ isOpen, onOpen, onOpenChange, initialState }: IsOpen) {
  const { image, Department, email, role, name, last, username } = initialState;

  const [isEditingAvatar, setisEditingAvatar] = useState(false);
  const [isEditingUsername, setisEditingUsername] = useState(false);

  const handleEditAvatar = () => {
    setisEditingAvatar(!isEditingAvatar);
  };

  const handleEditUsername = () => {
    setisEditingUsername(!isEditingUsername);
  };

  return (
    <>
      <Button variant="ghost" onPress={onOpen}>
        EDIT
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                EDIT YOUR ACCOUNT
              </ModalHeader>
              <ModalBody>
                <div className="flex">
                  {!isEditingAvatar && (
                    <div className="flex gap-3 flex-col w-full h-full items-center justify-center">
                      <div className="flex">
                        <Badge
                          content={
                            <Edit
                              className="w-4 h-4 hover:cursor-pointer"
                              onClick={handleEditAvatar}
                            />
                          }>
                          <Avatar
                            src={image || ""}
                            size="lg"
                            name={username || ""}
                          />
                        </Badge>
                      </div>
                      <div className="flex gap-3 w-full justify-evenly mt-6 items-center">
                        {!isEditingUsername && (
                          <div className="text-gray-500 text-sm">
                            {username}
                          </div>
                        )}
                        <Button
                          size="sm"
                          onClick={handleEditUsername}
                          color="primary"
                          isIconOnly>
                          {isEditingUsername ? <X /> : <Edit />}
                        </Button>
                      </div>
                    </div>
                  )}

                  {isEditingAvatar && (
                    <div className="w-full h-full flex items-center justify-center flex-col">
                      <Avatar
                        src={image || ""}
                        size="lg"
                        name={username || ""}
                      />
                      {/* <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                          if (url) {
                            onSubmit({ imageURL: url });
                          }
                        }}
                      /> */}
                      <div className="text-xs text-muted-foreground mt-4">
                        <Button
                          size="sm"
                          onClick={handleEditAvatar}
                          color="danger"
                          isIconOnly>
                          <X />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default IsSetting;
