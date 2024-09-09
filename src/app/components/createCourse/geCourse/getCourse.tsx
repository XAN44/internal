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
import axios from "axios";
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

interface Course {
  id: number;
  title: string;
  isPublished: boolean;
  imageURL: string;
  chapterCount: number;
}

async function GetCourseData() {
  const response = await axios.get("/api/course/getcustomcourse");
  if (!response) {
    throw new Error("cannot fetch course");
  }

  return response.data;
}

function GetCourse() {
  const [isLoading, setIsLoading] = useState(false);

  const [course, getCourse] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const rowPerpage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetCourseData();
        getCourse(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { label: "Thumbnail" },
    // { label: "Title" },
    { label: "Published" },
    { label: "Chapter Count" },
    { label: "Action" },
  ];

  const router = useRouter();
  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/course/${id}`);
      router.refresh();
      toast.success("Delete course success!");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const [filterValue, setFilterValue] = useState("");

  const filteredCourses = useMemo(() => {
    let filterCourse = [...course];

    if (filterValue) {
      filterCourse = filterCourse.filter((course) =>
        course.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filterCourse;
  }, [filterValue, course]);

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
          <TableBody emptyContent="No rows to display" items={items}>
            {(row) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "badge bg-slate-500 text-gray-700",
                      row.isPublished && "text-gray-200 bg-sky-700"
                    )}>
                    {row.chapterCount ? "Published" : "Draft"}
                  </div>
                </TableCell>
                <TableCell>{row.chapterCount}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip content="Redirect to custom course page">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <Link href={`/createcourse/${row.id}`}>
                          <EditIcon />
                        </Link>
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
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
    </>
  );
}

export default GetCourse;
