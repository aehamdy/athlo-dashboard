import Currency from '@/components/shared/Currency';
import ProductVariantAttributes from './ProductVariantAttributes';

interface InvoiceTableProps {
  itemsList: any[];
}

function InvoiceTable({ itemsList }: InvoiceTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="uppercase font-semibold text-xs text-gray-500 border-b border-black">
          <td className="py-tiny">Product</td>

          <td className="py-tiny text-center">Qty</td>

          <td className="py-tiny text-center">Unit</td>

          <td className="py-tiny text-center">Total</td>
        </tr>
      </thead>

      <tbody>
        {itemsList?.map((item: any) => (
          <tr key={item?.sku} className="text-xs not-last:border-b">
            <td className="py-sm">
              <div className="flex flex-col">
                <span className="max-w-[270px] font-medium truncate">
                  {item?.productName}
                </span>

                <span className="text-xs">
                  <ProductVariantAttributes
                    attributeValueEn={item?.attributeValue ?? ''}
                    unit={item?.unit ?? ''}
                    colorLabel={item?.color ?? ''}
                  />
                </span>
              </div>
            </td>

            <td className="text-center py-sm">{item?.quantity}</td>

            <td className="text-center py-sm">
              <Currency symbol /> {item?.unitPrice?.toLocaleString('en-US')}
            </td>

            <td className="font-semibold text-center py-sm text-gray-700">
              <Currency symbol /> {item?.totalPrice?.toLocaleString('en-US')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InvoiceTable;
