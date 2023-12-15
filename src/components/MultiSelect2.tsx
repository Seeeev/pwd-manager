import * as React from "react";
import { cn } from "@/lib/utils";

import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export type OptionType = {
  name: string;
  id: number;
};

interface MultiSelectProps {
  options?: OptionType[];
  selected: number[];
  onChange: React.Dispatch<React.SetStateAction<number[]>>;
  className?: string;
  isRequired?: boolean
}

function MultiSelect({
  options,
  selected,
  isRequired,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: number) => {
    onChange(selected.filter((i) => i !== item));
  };

  function getLabelByValue(valueToFind: number): string | undefined {
    const matchingOption = options?.find((option) => option.id === valueToFind);
    return matchingOption?.name;
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${
            selected.length > 1 ? "h-full" : "h-10"
          }`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-1 flex-wrap">
            {selected.map((item) => (
              <Badge
                variant="secondary"
                key={item}
                className="mr-1 mb-1"
                onClick={() => handleUnselect(item)}
              >
                {getLabelByValue(item)}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options?.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => {
                  onChange(
                    selected.includes(option.id)
                      ? selected.filter((item) => item !== option.id)
                      : [...selected, option.id]
                  );
                  setOpen(true);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.id) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.name}
              </CommandItem>
            ))}
            {/* {options === undefined && (
              <CommandItem key={1}>Loading options, please wait...</CommandItem>
            )} */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
