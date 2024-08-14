"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";

export default function SelectInterest() {
  const list = [
    {
      title: "Hard Skill",
      description: "Recommended",
    },
    {
      title: "Soft Skill",
      description: "Recommended",
    },
    {
      title: "English",
      description: "Recommended",
    },
    {
      title: "Cognitive Learning",
      description: "Google Workspace",
    },
    {
      title: "Google Workspace",
      description: " Perfect for any role",
    },
    {
      title: "Microsoft Office",
      description: " Perfect for any role",
    },
    {
      title: "Finance",
      description: "Developing your financial insights",
    },
    {
      title: "Example lorem long ",
      description: "Test example description",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
    {
      title: "short",
      description: "short example",
    },
  ];

  return (
    <div
      className="
    bg-white  
    rounded-[calc(1.5rem-1px)] 
    w-full h-full overflow-y-auto  space-x-6 items-start justify-center p-0">
      <div
        className="
      grid 
      p-4
      ssm:grid-cols-1
      smd:grid-cols-2
      lg:grid-cols-4 
      xsm:grid-cols-2 
      gap-5  ">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            onPress={() => console.log("item pressed")}
            className="
          h-32
          smd:h-44
          lg:h-44  
          bg-gradient-to-br 
        from-blue-500 
        to-blue-700">
            <CardBody
              className="
            w-full 
            h-full 
            items-start 
            justify-center 
            overflow-visible 
            p-4
            
            ">
              <div className="flex flex-col text-white">
                <p
                  className="
                slg:text-2xl
                 xl:text-3xl
                font-bold text-xl ">
                  {item.title}
                </p>
                <p className="text-xs">{item.description}</p>
              </div>
              <Checkbox
                size="lg"
                color="success"
                radius="full"
                className=" 
                absolute 
                ssm:top-[20px]
                ssm:right-[15px]
                top-[38px]  
                right-[20px]"
                classNames={{
                  wrapper: "bg-white",
                }}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
