import { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

interface CardContainerProp {
  children: ReactNode;
  description: String;
}

export default function CardContainer({
  children,
  description,
}: CardContainerProp) {
  return (
    <Card className="">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
