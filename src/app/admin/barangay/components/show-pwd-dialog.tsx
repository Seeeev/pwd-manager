import { Pwd } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ShowPwdDialogProps {
  data: Pwd[];
}
export default function ShowPwdDialog({ data }: ShowPwdDialogProps) {
  console.log(data);
  return (
    <Dialog>
      <DialogTrigger className="text-sm">Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle>List of PWD in this barangay</DialogTitle> */}
          <DialogDescription>
            Here is the list of PWDs in this barangay.
          </DialogDescription>
          {data.map((pwd, index) => (
            <p id={pwd.pwdNumber}>
              {`${index + 1}. ${pwd.lastName}, ${pwd.firstName} ${
                pwd.middleName
              } ${pwd.suffix}`}
            </p>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
