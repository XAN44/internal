"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import axios, { isAxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { cn } from "../../../../../lib/utils";
import { BsThreeDots } from "react-icons/bs";
import CourseButton from "../../course/CourseButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ConfirmModal } from "../../modals/confirmModal";
import { DeleteIcon, EditIcon, EyeIcon, SearchIcon } from "lucide-react";
import { ActionsTable } from "../cardCourseCustom/ActionsTabel";
import { ActionsTableToCourse } from "../cardCourseCustom/ActionsToCustomCourse";
import Link from "next/link";
import UpdateCategory from "./updateCategory";

interface CategoryData {
  id: string;
  name: string;
  description: string;
}

interface Category {
  category: CategoryData[];
}

function GetCategory({ category }: Category) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null
  );

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setSelectedCategory(null);
  };
  const [page, setPage] = useState(1);
  const rowPerpage = 10;

  const columns = [
    { label: "Category Name" },
    { label: "Description" },
    { label: "Actions" },
  ];

  const router = useRouter();
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/getcategory`, {
        data: { id },
      });

      const message = response.data.message || "Delete course success!";

      toast.success(message);
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const [filterValue, setFilterValue] = useState("");

  const filteredCourses = useMemo(() => {
    let filterCourse = [...category];

    if (filterValue) {
      filterCourse = filterCourse.filter((course) =>
        course.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filterCourse;
  }, [filterValue, category]);

  const pages = Math.ceil(filteredCourses.length / rowPerpage);

  const items = useMemo(() => {
    const start = (page - 1) * rowPerpage;
    const end = start + rowPerpage;
    return filteredCourses.slice(start, end);
  }, [page, filteredCourses, rowPerpage]);

  return (
    <>
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Search by course..."
        startContent={<SearchIcon />}
        value={filterValue}
        onClear={() => setFilterValue("")}
        onValueChange={(value) => setFilterValue(value)}
      />
      <div className=" w-full flex">
        <Table
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
          aria-label="Example table with dynamic content">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.label}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={items}>
            {(row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>

                <TableCell>{row.description}</TableCell>

                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Redirect to custom course page">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => handleEdit(row)}>
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete Course">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <ActionsTable onConfirm={() => handleDelete(row.id)}>
                          <DeleteIcon />
                        </ActionsTable>
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isEditing && (
        <div
          className="fixed 
            inset-0 
            flex 
            h-full 
            w-full 
            items-center 
            justify-center 
            bg-black bg-opacity-60">
          <UpdateCategory
            handleCreateCategory={closeEditModal}
            existingCategory={selectedCategory}
          />
        </div>
      )}
    </>
  );
}

export default GetCategory;
