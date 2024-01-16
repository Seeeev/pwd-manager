import { Pwd } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ShowPwdDialogProps {
  data: Pwd[];
}
export default function ShowPwdDialog({ data }: ShowPwdDialogProps) {
  console.log(data);
  return (
    <Dialog>
      <DialogTrigger className="text-sm">Show PWD</DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          {/* <DialogTitle>List of PWD in this barangay</DialogTitle> */}
          <DialogDescription>
            Here is the list of PWDs in this barangay.
          </DialogDescription>
          <ScrollArea className="h-[400px]">
            {data.length != 0 ? (
              data.map((pwd, index) => (
                <p key={pwd.pwdNumber}>
                  {`${index + 1}. ${pwd.lastName || ""}, ${
                    pwd.firstName || ""
                  } ${pwd.middleName || ""} ${pwd.suffix || ""}`}
                </p>
              ))
            ) : (
              <p>No PWD found.</p>
            )}
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
