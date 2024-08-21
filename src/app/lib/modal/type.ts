// types.ts
export interface Course {
  title: string;
  name: string;
  avatar: string;
  description: string;
}

export interface CourseCategory {
  key: string;
  label: string;
}

export interface CourseProps {
  category: string;
}
