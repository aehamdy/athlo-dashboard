import Icon from '@/components/shared/Icon';
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { paymentMethods } from '../../constants';

type PaymentsAndNotesProps = {
  paymentMethod: number;
  setPaymentMethod: (value: number) => void;
  notes: string;
  setNotes: (value: string) => void;
};

function PaymentsAndNotes({
  paymentMethod,
  setPaymentMethod,
  notes,
  setNotes,
}: PaymentsAndNotesProps) {
  return (
    <section className="space-y-base">
      <div className="flex flex-col gap-sm">
        <h3 className="font-semibold text-xs uppercase text-gray-400">
          Payment Method
        </h3>

        <div>
          <RadioGroup
            className="flex flex-wrap items-center"
            value={String(paymentMethod)}
            defaultValue={paymentMethods[0].value}
            onValueChange={(value) => {
              setPaymentMethod(Number(value));
            }}
          >
            {paymentMethods.map((method) => (
              <FieldLabel
                key={method.id}
                htmlFor={method.label}
                className="flex flex-1 cursor-pointer"
              >
                <Field orientation="horizontal">
                  <RadioGroupItem
                    value={method.value}
                    id={method.label}
                    className="p-0 border-gray-300 data-[state=checked]:border-accent  data-[state=checked]:bg-accent text-white"
                  />

                  <FieldContent>
                    <FieldTitle className="flex items-center gap-sm">
                      <Icon name={method.icon} size={20} />

                      <span className="">{method.label}</span>
                    </FieldTitle>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex flex-col gap-sm">
        <h3 className="font-semibold text-xs uppercase text-gray-400">
          Order Notes
        </h3>

        <Textarea
          placeholder="Add order notes..."
          className="form-input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </section>
  );
}

export default PaymentsAndNotes;
