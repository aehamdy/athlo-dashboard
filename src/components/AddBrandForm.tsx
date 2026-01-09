import { Input } from "./ui/input";

export type AddBrandFormData = {
  nameEn: string;
  nameAr: string;
};

interface AddBrandFormProps {
  value: AddBrandFormData;
  onChange: (value: AddBrandFormData) => void;
}

function AddBrandForm({ value, onChange }: AddBrandFormProps) {
  return (
    <div className="grid gap-4">
      <Input
        name="nameEn"
        placeholder="Enter brand name in English"
        value={value.nameEn}
        onChange={(e) => onChange({ ...value, nameEn: e.target.value })}
        className="form-input"
      />

      <Input
        name="nameAr"
        placeholder="أدخل اسم العلامة التجارية بالعربية"
        value={value.nameAr}
        onChange={(e) => onChange({ ...value, nameAr: e.target.value })}
        className="form-input"
      />
    </div>
  );
}

export default AddBrandForm;
