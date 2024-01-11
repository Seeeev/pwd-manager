import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { title } from "process";
interface AnnoucementCardProps{
    title: string,
    body: string,
    date: Date
}
export default function AnnoucementCard({title, body, date}: AnnoucementCardProps){
    function formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      const formattedDate = new Date(date).toLocaleDateString("en-US", options);
      return formattedDate.replace(/\//g, "-");
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>{body}</p>
        </CardContent>
        <CardFooter>
          <p>{formatDate(date)}</p>
        </CardFooter>
      </Card>
    );
}