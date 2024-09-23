"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const FAQPage = () => {
  const faqs = [
    {
      question: "What courses are available?",
      answer:
        "We offer a variety of courses, including technical skills courses, soft skills courses, and self-development courses.",
    },
    {
      question: "Who can participate in the courses?",
      answer:
        "All employees in the company can participate in the courses without any restrictions.",
    },
    {
      question: "Can I create a course?",
      answer:
        "Yes! All employees can create courses to share knowledge and experiences with their colleagues.",
    },
    {
      question: "Is there any cost for these courses?",
      answer: "All courses in this project are free for all employees.",
    },
    {
      question: "How can I enroll in a course?",
      answer:
        "You can enroll in a course by going to the course listing page and selecting the course you are interested in.",
    },
    {
      question: "How can I contact the administrator?",
      answer:
        "You can contact the administrator at the email address systemxandav@gmail.com.",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">คำถามที่พบบ่อย (FAQ)</h1>
      <Accordion>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            aria-label={faq.question}
            title={faq.question}>
            {faq.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQPage;
