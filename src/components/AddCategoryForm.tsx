import { Input } from "./ui/input";

export type AddCategoryFormData = {
  name: string;
};

interface AddCategoryFormProps {
  value: AddCategoryFormData;
  onChange: (value: AddCategoryFormData) => void;
}

function AddCategoryForm({ value, onChange }: AddCategoryFormProps) {
  return (
    <div className="grid gap-4">
      <Input
        name="categoryEn"
        placeholder="Enter category name (English)"
        value={value.name}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
        className="form-input"
      />

      <Input
        name="categoryAr"
        placeholder="ادخل اسم التصنيف (العربية)"
        value={value.name}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
        className="form-input"
      />
    </div>
  );
}

export default AddCategoryForm;
