import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { InputHTMLAttributes } from "react";

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isReadOnly?: boolean;
  placeholder?: string;
  className?: string;
  isRequired?: boolean;
  type?: string;
}
export default function CustomFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  isRequired,
  isReadOnly = false,
  type,
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="whitespace-nowrap">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              readOnly={isReadOnly}
             
              type={type}
              className={`min-w-full ${className}`}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
