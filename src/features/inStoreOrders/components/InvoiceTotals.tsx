import Currency from '@/components/shared/Currency';

interface InvoiceTotalsProps {
  finalAmount: number;
}

function InvoiceTotals({ finalAmount }: InvoiceTotalsProps) {
  return (
    <div className="mt-base border-t">
      <div className="w-1/2 md:w-1/3 ms-auto pt-sm text-gray-400">
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium">Subtotal</span>

          <div className="flex items-center gap-tiny text-gray-700">
            <Currency symbol />

            <span>{finalAmount.toLocaleString('en-GB')}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-sm text-xs">
          <span className="font-medium">Tax</span>
          <span className="text-gray-700">0</span>
        </div>

        <div className="flex justify-between items-center mt-compact pt-sm font-semibold text-gray-700 border-t border-gray-300 border-dashed">
          <span className="font-medium">Total Paid</span>

          <div className="flex items-center gap-tiny">
            <Currency symbol />

            <span className="">{finalAmount.toLocaleString('en-GB')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceTotals;
