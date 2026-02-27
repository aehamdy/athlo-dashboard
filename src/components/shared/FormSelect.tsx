import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Brand, Category } from "@/types";

type Props = {
  placeholder: string;
  value?: string | number;
  onValueChange: (value: string) => void;
  options: Brand[] | Category[];
  error?: string;
  disabled?: boolean;
};

function FormSelect({
  placeholder,
  value,
  onValueChange,
  options,
  error,
  disabled,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Select
        value={String(value ?? "")}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="form-input w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}

export default FormSelect;
