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
  options: number[] | { id: number; value: T; label: string }[];
  placeholder?: string;
  className?: string;
  label?: string;
};

export default function CustomSelect<T>({
  value,
  onChange,
  options,
  label,
  placeholder = "",
  className,
}: CustomSelectProps<T>) {
  return (
    <div className="flex items-center gap-sm">
      {label && (
        <Label
          htmlFor="selectElement"
          className="text-muted-foreground whitespace-nowrap"
        >
          {label}
        </Label>
      )}

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
              <SelectItem
                key={String(typeof option === "object" ? option.id : option)}
                value={String(
                  typeof option === "object" ? option.value : option,
                )}
              >
                {typeof option === "object" ? option.label : String(option)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
