import { Input } from "./ui/input";

function AddCategoryForm() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Input
          id="english-name"
          name="english-name"
          placeholder="Enter category name in English"
        />
      </div>

      <div className="grid gap-3">
        <Input
          id="arabic-name"
          name="arabic-name"
          placeholder="أدخل اسم الفئة بالعربية"
        />
      </div>
    </div>
  );
}

export default AddCategoryForm;
