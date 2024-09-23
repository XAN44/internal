"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

interface Props {
  enrolement: {
    courseId: string;
    isEnrollment: boolean;
    Course: {
      title: string;
    };
  }[];
}

function ManageMentCard({ enrolement }: Props) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // สถานะโหลด
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const handleDeleteEnrollment = async () => {
    if (!selectedCourseId) return;

    setLoading(true); // เริ่มโหลด
    try {
      const response = await axios.delete(`/api/cancelcourse`, {
        data: { courseId: selectedCourseId },
      });

      if (response.data.success) {
        toast.success("Enrollment deleted successfully");
        router.refresh(); // รีเฟรชข้อมูล
      }
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      alert("Failed to delete enrollment");
    } finally {
      setLoading(false); // สิ้นสุดโหลด
      setSelectedCourseId(null);
      onClose();
    }
  };

  const openModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    onOpen(); // เปิดโมดอล
  };

  return (
    <div className="w-full grid grid-cols-1 place-items-center gap-5 items-start justify-center">
      <p className="text-blue-500 font-bold">COURSE MANAGEMENT</p>
      <div className="grid grid-cols-2 place-items-center place-content-center items-start w-full h-full">
        <p className="text-blue-500">ENROLLED COURSES</p>
        <p className="text-blue-500">ENROLLMENT STATUS</p>
      </div>
      <div className="h-96 w-full grid grid-cols-4 overflow-y-auto place-items-center place-content-start items-start gap-4">
        <div className="flex flex-col items-start col-span-2 justify-start gap-4">
          {enrolement.map((item) => (
            <Link key={item.courseId} href={`/course/${item.courseId}`}>
              <p className="text-gray-500">{item.Course.title}</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-start col-span-2 justify-start gap-4">
          {enrolement.map((item) => (
            <Button
              className="text-red-500 hover:cursor-pointer"
              key={item.courseId}
              onClick={() => openModal(item.courseId)}>
              Delete
            </Button>
          ))}
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <h3>Confirm Deletion</h3>
              </ModalHeader>
              <ModalBody>
                <p>
                  You are about to delete this enrollment. Once deleted, you
                  will not be able to recover the enrollment history.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleDeleteEnrollment}
                  disabled={loading}>
                  {loading ? "Deleting..." : "Confirm"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ManageMentCard;
