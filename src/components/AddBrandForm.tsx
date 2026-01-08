import { Input } from "./ui/input";

function AddBrandForm() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Input
          id="english-name"
          name="english-name"
          placeholder="Enter brand name in English"
        />
      </div>

      <div className="grid gap-3">
        <Input
          id="arabic-name"
          name="arabic-name"
          placeholder="أدخل اسم العلامة التجارية بالعربية"
        />
      </div>
    </div>
  );
}

export default AddBrandForm;
