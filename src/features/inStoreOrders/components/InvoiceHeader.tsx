import Logo from '@/components/shared/Logo';

interface InvoiceHeaderProps {
  invoiceNumber: string;
  paymentMethod: string;
  date: string;
  createdBy: string;
}

function InvoiceHeader({
  invoiceNumber,
  paymentMethod,
  date,
  createdBy,
}: InvoiceHeaderProps) {
  return (
    <div>
      <div className="flex justify-between items-center gap-tiny">
        <div className="">
          <Logo dark />
        </div>

        <div className="flex flex-col gap-tiny text-xs">
          <div className="flex items-center gap-sm">
            <span className="font-semibold">INVOICE</span>
            <span className="font-medium">#{invoiceNumber}</span>
          </div>

          <div className="flex items-center gap-sm">
            <span className="font-semibold">Payment Method</span>
            <span className="font-medium capitalize">{paymentMethod}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center my-base p-regular text-xs bg-accent/20 rounded-md">
        <div className="flex flex-col gap-tiny">
          <span className="uppercase font-medium text-gray-500">Date</span>
          <span className="font-semibold">{date}</span>
        </div>

        <div className="flex flex-col gap-tiny">
          <span className="uppercase font-medium text-gray-500">Cashier</span>
          <span className="font-semibold capitalize">{createdBy}</span>
        </div>
      </div>
    </div>
  );
}

export default InvoiceHeader;
