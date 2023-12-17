import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: String;
  data: { value: string; label: String }[] | { id: number; name: String }[];
  placeholder?: String;
  isRequired?: boolean;
}
export default function CustomSelectField<T extends FieldValues>({
  control,
  name,
  label,
  data,
  placeholder,
  isRequired
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="]">
          <FormLabel className="whitespace-nowrap">
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((val) => (
                <SelectItem
                  key={"value" in val ? val.value : val.id.toString()}
                  value={"value" in val ? val.value : val.id.toString()}
                >
                  {"label" in val ? val.label : val.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
