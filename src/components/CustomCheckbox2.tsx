import { FieldValues, Control, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from "./ui/form";
import { Checkbox } from "./ui/checkbox";

interface CustomCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: String;
  placeholder?: string;
  isRequired?: boolean
  onChange?: (value: boolean | string) => void;
}
export default function CustomCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  onChange,
  isRequired
}: CustomCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(value) => {
                field.onChange(value);
                // Call the onChange prop to notify the parent component
                if (onChange) {
                  onChange(value);
                }
              }}
            />
          </FormControl>
          {/* <div className="space-y-1 leading-none"> */}
          <FormLabel>
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          {/* <FormDescription>
              You can manage your mobile notifications in the{" "}
              <Link href="/examples/forms">mobile settings</Link> page.
            </FormDescription> */}
          {/* </div> */}
        </FormItem>
      )}
    />
  );
}
