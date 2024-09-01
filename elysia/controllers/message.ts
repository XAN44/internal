// controllers/message.ts
import Elysia, { t } from "elysia";

export const exampleCourses = [
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Introduction to Python",
    duration: 10, // ระยะเวลารวมของคอร์ส (ชั่วโมง)
    isRequired: false,
    isCompleted: true,
    isBookMark: true,
    category: "Hard Skill",
    badge: {
      id: "badge5",
      title: "Completed Introduction to Python",
      date: "2024-05-15",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Getting Started",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Install Python",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-01",
            dueDate: "2024-01-03",
          },
          {
            id: "task2",
            title: "Run Hello World Script",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-03",
            dueDate: "2024-01-05",
          },
        ],
      }, // ระยะเวลาของบทเรียน (ชั่วโมง)
      {
        id: "chapter2",
        title: "Variables and Data Types",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn about Variables",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-06",
            dueDate: "2024-01-08",
          },
          {
            id: "task2",
            title: "Practice Data Types",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-08",
            dueDate: "2024-01-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Control Structures",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "If-Else Statement",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-11",
            dueDate: "2024-01-13",
          },
          {
            id: "task2",
            title: "Loops",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-13",
            dueDate: "2024-01-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Functions",
        duration: 2.5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Define Functions",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-01-16",
            dueDate: "2024-01-18",
          },
          {
            id: "task2",
            title: "Practice Functions",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-01-18",
            dueDate: "2024-01-20",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Advanced Python",
    duration: 12,
    isRequired: true,
    isCompleted: false,
    isBookMark: true,
    category: "Hard Skill",
    badge: null,
    chapters: [
      {
        id: "chapter1",
        title: "OOP in Python",
        duration: 4,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Classes and Objects",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-02-01",
            dueDate: "2024-02-03",
          },
          {
            id: "task2",
            title: "Inheritance",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-02-03",
            dueDate: "2024-02-05",
          },
        ],
      },
      {
        id: "chapter2",
        title: "Decorators and Generators",
        duration: 3,
        isCompleted: false,
        tasks: [
          {
            id: "task1",
            title: "Learn about Decorators",
            isCompleted: false,
            skillType: "Hard Skill",
            assignedDate: "2024-02-06",
            dueDate: "2024-02-08",
          },
          {
            id: "task2",
            title: "Practice with Generators",
            isCompleted: false,
            skillType: "Soft Skill",
            assignedDate: "2024-02-08",
            dueDate: "2024-02-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "File Handling",
        duration: 2,
        isCompleted: false,
        tasks: [
          {
            id: "task1",
            title: "Read and Write Files",
            isCompleted: false,
            skillType: "Hard Skill",
            assignedDate: "2024-02-11",
            dueDate: "2024-02-13",
          },
          {
            id: "task2",
            title: "File Paths",
            isCompleted: false,
            skillType: "Soft Skill",
            assignedDate: "2024-02-13",
            dueDate: "2024-02-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Testing in Python",
        duration: 3,
        isCompleted: false,
        tasks: [
          {
            id: "task1",
            title: "Unit Testing",
            isCompleted: false,
            skillType: "Hard Skill",
            assignedDate: "2024-02-16",
            dueDate: "2024-02-18",
          },
          {
            id: "task2",
            title: "Integration Testing",
            isCompleted: false,
            skillType: "Soft Skill",
            assignedDate: "2024-02-18",
            dueDate: "2024-02-20",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Python for Data Science",
    duration: 15,
    isRequired: false,
    isCompleted: true,
    isBookMark: false,
    category: "Soft Skill",
    badge: {
      id: "badge6",
      title: "Completed Python for Data Science",
      date: "2022-09-10",
    },
    chapters: [
      {
        id: "chapter1",
        title: "Introduction to Data Science",
        duration: 5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "What is Data Science?",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-03-01",
            dueDate: "2024-03-03",
          },
          {
            id: "task2",
            title: "Importance of Data Science",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-03-03",
            dueDate: "2024-03-05",
          },
        ],
      },
      {
        id: "chapter2",
        title: "Data Visualization",
        duration: 5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Introduction to Matplotlib",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-03-06",
            dueDate: "2024-03-08",
          },
          {
            id: "task2",
            title: "Create Graphs",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-03-08",
            dueDate: "2024-03-10",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Pandas and NumPy",
        duration: 3,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Learn Pandas",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-03-11",
            dueDate: "2024-03-13",
          },
          {
            id: "task2",
            title: "Practice with NumPy",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-03-13",
            dueDate: "2024-03-15",
          },
        ],
      },
      {
        id: "chapter4",
        title: "Machine Learning Basics",
        duration: 2,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "Introduction to ML",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-03-16",
            dueDate: "2024-03-18",
          },
          {
            id: "task2",
            title: "Linear Regression Basics",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-03-18",
            dueDate: "2024-03-20",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Web Development with Python",
    duration: 20,
    isRequired: true,
    isCompleted: false,
    isBookMark: true,
    category: "Hard Skill",
    badge: null,
    chapters: [
      {
        id: "chapter1",
        title: "Introduction to Web Development",
        duration: 5,
        isCompleted: true,
        tasks: [
          {
            id: "task1",
            title: "What is Web Development?",
            isCompleted: true,
            skillType: "Soft Skill",
            assignedDate: "2024-04-01",
            dueDate: "2024-04-03",
          },
          {
            id: "task2",
            title: "Frontend vs Backend",
            isCompleted: true,
            skillType: "Hard Skill",
            assignedDate: "2024-04-03",
            dueDate: "2024-04-05",
          },
        ],
      },
      {
        id: "chapter2",
        title: "HTML, CSS, and JavaScript",
        duration: 7,
        isCompleted: false,
        tasks: [
          {
            id: "task1",
            title: "Introduction to HTML",
            isCompleted: false,
            skillType: "Hard Skill",
            assignedDate: "2024-04-06",
            dueDate: "2024-04-08",
          },
          {
            id: "task2",
            title: "Introduction to CSS",
            isCompleted: false,
            skillType: "Hard Skill",
            assignedDate: "2024-04-08",
            dueDate: "2024-04-10",
          },
          {
            id: "task3",
            title: "Introduction to JavaScript",
            isCompleted: false,
            skillType: "Hard Skill",
            assignedDate: "2024-04-10",
            dueDate: "2024-04-12",
          },
        ],
      },
      {
        id: "chapter3",
        title: "Building a Web App with Django",
        duration: 8,
        isCompleted: false,
        tasks: [
          {
            id: "task1",
            title: "Setup Django Project",
            isCompleted: false,
            skillType: "Hard Skill",
            assignedDate: "2024-04-13",
            dueDate: "2024-04-15",
          },
          {
            id: "task2",
            title: "Create Django Models",
            isCompleted: false,
            skillType: "Hard Skill",
            assignedDate: "2024-04-15",
            dueDate: "2024-04-17",
          },
          {
            id: "task3",
            title: "Create Django Views and Templates",
            isCompleted: false,
            skillType: "Hard Skill",
            assignedDate: "2024-04-17",
            dueDate: "2024-04-19",
          },
        ],
      },
    ],
  },
];

// ประกาศ AvatarResponse สำหรับข้อมูลที่ต้องการ
const AvatarResponse = t.Object({
  success: t.Boolean(),
  avatar: t.String(),
  name: t.String(),
  job: t.String(),
  departMent: t.String(),
  userName: t.String(),
  email: t.String(),
  interest: t.Object({
    useInterest: t.Array(t.String()),
  }),
  Course: t.Object({
    AllCourse: t.Array(
      t.Object({
        id: t.String(),
        title: t.String(),
        duration: t.Number(),
        isRequired: t.Boolean(),
        isCompleted: t.Boolean(),
        isBookMark: t.Boolean(),
        category: t.String(),
        chapters: t.Array(
          t.Object({
            id: t.String(),
            title: t.String(),
            duration: t.Number(),
            isCompleted: t.Boolean(),
            tasks: t.Array(
              t.Object({
                id: t.String(),
                title: t.String(),
                isCompleted: t.Boolean(),
                skillType: t.String(),
                assignedDate: t.String(),
                dueDate: t.String(),
              })
            ),
          })
        ),
        completionPercentage: t.String(),
      })
    ),
    pendingTask: t.Number(),
    pendingTaskPersentage: t.String(),
    completedTask: t.Number(),
    completionTaskPersentage: t.String(),
    allCoursePerCentage: t.String(),
    requireCoursePerCentage: t.String(),
    hourseLeft: t.String(),
    StatusCompleted: t.Number(),
    StatusPending: t.Number(),
    HardSkill: t.Number(),
    SoftSkill: t.Number(),
    newBadgeAchievementsThisYear: t.Number(),
    totalBadgesSoFarThisYear: t.Number(),
    hardSkillPercentage: t.Number(),
    softSkillPercentage: t.Number(),
    TaskHardSkill: t.Number(),
    TaskSoftSkill: t.Number(),
    LatestCourse: t.Object({
      id: t.String(),
      title: t.String(),
      chapter: t.Object({
        id: t.String(),
        title: t.String(),
        tasks: t.Array(
          t.Object({
            id: t.String(),
            title: t.String(),
            isCompleted: t.Boolean(),
            skillType: t.String(),
            assignedDate: t.String(),
            dueDate: t.String(),
          })
        ),
      }),
    }),
  }),
});

export const messageController = new Elysia({ prefix: "/Course" }).get(
  "/ChangeAvatar",
  () => {
    const avatar =
      "https://images.unsplash.com/photo-1720048171419-b515a96a73b8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const name = "Xan Kym";
    const job = "Full Stack Web Dev";
    const departMent = "DepartMent";
    const userName = "Test_EEE";
    const email = "example@mail.com";
    const useInterest = [
      "HARD SKILL",
      "SOFT SKILL",
      "COGNITIVE",
      "PRESENTATION",
      "ENGLISH",
      "MARKETING",
    ];

    const course = exampleCourses;

    const StatusPending = course.filter((c) => !c.isCompleted).length;
    const StatusCompleted = course.filter((c) => c.isCompleted).length;

    const HardSkill = course.filter((c) => c.category === "Hard Skill").length;
    const SoftSkill = course.filter((c) => c.category === "Soft Skill").length;

    const allTasks = exampleCourses.flatMap((course) =>
      course.chapters.flatMap((chapter) => chapter.tasks)
    );

    const totalTask = allTasks.length;

    const TaskHardSkill = allTasks.filter(
      (f) => f.skillType === "Hard Skill"
    ).length;
    const TaskSoftSkill = allTasks.filter(
      (f) => f.skillType === "Soft Skill"
    ).length;

    const hardSkillPercentage = (TaskHardSkill / totalTask) * 100;
    const softSkillPercentage = (TaskSoftSkill / totalTask) * 100;

    const completedTask = allTasks.filter((f) => f.isCompleted).length;
    const completionTaskPersentage = (completedTask / totalTask) * 100;
    const pendingTask = allTasks.filter((f) => !f.isCompleted).length;
    const pendingTaskPersentage = (pendingTask / totalTask) * 100;

    const totalCourse = course.length;
    const completedCourse = course.filter((c) => c.isCompleted).length;
    const allCoursePerCentage = (completedCourse / totalCourse) * 100;

    const requireCourse = course.filter((c) => c.isRequired);

    const totalRequireCourse = requireCourse.length;
    const completedRequireCourse = requireCourse.filter(
      (c) => c.isCompleted
    ).length;

    const requireCoursePerCentage =
      (completedRequireCourse / totalRequireCourse) * 100;

    const currentYear = new Date().getFullYear();

    const newBadgeAchievementsThisYear = course.filter(
      (c) =>
        c.isCompleted &&
        c.badge !== null &&
        new Date(c.badge.date).getFullYear() === currentYear
    ).length;

    const totalBadgesSoFarThisYear = exampleCourses.filter(
      (c) =>
        c.badge !== null && new Date(c.badge.date).getFullYear() <= currentYear
    ).length;

    const coursesWithChapterPercentage = course.map((c) => {
      const totalChapter = c.chapters.length;
      const completedChapter = c.chapters.filter(
        (chap) => chap.isCompleted
      ).length;
      const completionPercentage =
        totalChapter > 0 ? (completedChapter / totalChapter) * 100 : 0;

      return {
        ...c,
        completionPercentage: completionPercentage.toFixed(2),
      };
    });

    // ดึงข้อมูลล่าสุดของคอร์สและแชปเตอร์ที่เรียนอยู่
    const latestCourse = coursesWithChapterPercentage.find((c) =>
      c.chapters.some((chap) => !chap.isCompleted)
    );

    const latestChapter = latestCourse?.chapters.find((chap) =>
      chap.tasks.some((task) => !task.isCompleted)
    );

    const LatestCourse = {
      id: latestCourse?.id || "",
      title: latestCourse?.title || "",
      chapter: {
        id: latestChapter?.id || "",
        title: latestChapter?.title || "",
        tasks:
          latestChapter?.tasks.map((task) => ({
            id: task.id,
            title: task.title,
            isCompleted: task.isCompleted,
            skillType: task.skillType,
            assignedDate: task.assignedDate,
            dueDate: task.dueDate,
          })) || [],
      },
    };

    return {
      job,
      departMent,
      name,
      avatar,
      userName,
      email,
      interest: {
        useInterest,
      },
      Course: {
        AllCourse: coursesWithChapterPercentage,
        hourseLeft: `${totalCourse - completedCourse} `,
        allCoursePerCentage: allCoursePerCentage.toFixed(2),
        requireCoursePerCentage: requireCoursePerCentage.toFixed(2),
        StatusCompleted,
        StatusPending,
        HardSkill,
        SoftSkill,
        newBadgeAchievementsThisYear,
        totalBadgesSoFarThisYear,
        completionTaskPersentage: completionTaskPersentage.toFixed(2),
        pendingTask,
        pendingTaskPersentage: pendingTaskPersentage.toFixed(2),
        totalTask,
        hardSkillPercentage: hardSkillPercentage,
        softSkillPercentage: softSkillPercentage,
        completedTask,
        TaskSoftSkill,
        TaskHardSkill,
        LatestCourse, // ข้อมูลคอร์สล่าสุดและแชปเตอร์ล่าสุด
      },
      success: true,
    };
  },
  {
    response: AvatarResponse,
  }
);
