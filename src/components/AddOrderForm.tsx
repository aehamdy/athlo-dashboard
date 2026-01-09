import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export type AddOrderFormData = {
  fullName: string;
  city: string;
  country: string;
  region: string;
  streetAddress: string;
  buildingNumber: string;
  floorNumber: string;
  apartmentNumber: string;
  phoneNumber: string;
  notes: string;
};

interface AddOrderFormProps {
  value: AddOrderFormData;
  onChange: (value: AddOrderFormData) => void;
}

function AddOrderForm({ value, onChange }: AddOrderFormProps) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="fullName"
          placeholder="Enter full name"
          value={value.fullName}
          onChange={(e) => onChange({ ...value, fullName: e.target.value })}
          className="form-input"
        />

        <Input
          name="phoneNumber"
          placeholder="Enter phone number"
          value={value.phoneNumber}
          onChange={(e) => onChange({ ...value, phoneNumber: e.target.value })}
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="city"
          placeholder="Enter city"
          value={value.city}
          onChange={(e) => onChange({ ...value, city: e.target.value })}
          className="form-input"
        />

        <Input
          name="country"
          placeholder="Enter country"
          value={value.country}
          onChange={(e) => onChange({ ...value, country: e.target.value })}
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="region"
          placeholder="Enter region"
          value={value.region}
          onChange={(e) => onChange({ ...value, region: e.target.value })}
          className="form-input"
        />

        <Input
          name="streetAddress"
          placeholder="Enter street address"
          value={value.streetAddress}
          onChange={(e) =>
            onChange({ ...value, streetAddress: e.target.value })
          }
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="buildingNumber"
          placeholder="Enter building number"
          value={value.buildingNumber}
          onChange={(e) =>
            onChange({ ...value, buildingNumber: e.target.value })
          }
          className="form-input"
        />

        <Input
          name="floorNumber"
          placeholder="Enter floor number"
          value={value.floorNumber}
          onChange={(e) => onChange({ ...value, floorNumber: e.target.value })}
          className="form-input"
        />
      </div>

      <Input
        name="apartmentNumber"
        placeholder="Enter apartment number"
        value={value.apartmentNumber}
        onChange={(e) =>
          onChange({ ...value, apartmentNumber: e.target.value })
        }
        className="form-input"
      />

      <Textarea
        name="notes"
        placeholder="Type your notes here."
        value={value.notes}
        onChange={(e) => onChange({ ...value, notes: e.target.value })}
        className="form-input"
      />
    </div>
  );
}

export default AddOrderForm;
