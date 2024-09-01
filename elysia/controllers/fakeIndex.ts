// src/graphql/schema.ts
import { gql } from "@elysiajs/apollo";
import { exampleCourses } from "./message";

export const typeDefs = gql`
  type Query {
    courses: [Course]
    course(id: ID!): Course
  }

  type Course {
    id: ID!
    title: String!
    duration: Int!
    isRequired: Boolean!
    isCompleted: Boolean!
    isBookMark: Boolean!
    category: String!
    chapters: [Chapter]
    completionPercentage: String
  }

  type Chapter {
    id: ID!
    title: String!
    duration: Int!
    isCompleted: Boolean!
    tasks: [Task]
  }

  type Task {
    id: ID!
    title: String!
    isCompleted: Boolean!
    skillType: String!
  }
`;
export const resolvers = {
  Query: {
    courses: () => exampleCourses,
  },
};
