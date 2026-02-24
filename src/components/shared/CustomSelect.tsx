import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

type CustomSelectProps<T = string | number> = {
  value: T | null | undefined;
  onChange: (value: T) => void;
  options: number[];
  placeholder?: string;
  className?: string;
};

export default function CustomSelect<T>({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className,
}: CustomSelectProps<T>) {
  return (
    <div className="flex items-center gap-sm">
      <Label
        htmlFor="selectElement"
        className="text-muted-foreground whitespace-nowrap"
      >
        {placeholder}
      </Label>

      <Select
        value={value != null ? String(value) : undefined}
        onValueChange={(val) => onChange(val as unknown as T)}
      >
        <SelectTrigger
          id="selectElement"
          className={`min-w-14 md:min-w-20 w-full form-input ${className ?? ""}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={String(option)} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
