import { Label } from '@/components/ui/label';

type Props = {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
};

function FormLabel({ htmlFor, children, required }: Props) {
  return (
    <Label
      htmlFor={htmlFor}
      className="flex items-center gap-xs ms-xs text-neutral-muted text-xs"
    >
      {children}
      {required && <span className="text-red-600">*</span>}
    </Label>
  );
}

export default FormLabel;
