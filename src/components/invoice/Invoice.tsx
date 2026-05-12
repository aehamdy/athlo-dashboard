import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button } from '../ui/button';
import InvoiceDocument from './InvoiceDocument';
import { mapOrderToInvoice } from './utils/mapOrderToInvoice';
import type { OrderDetails } from '@/features/orders/types';
import type { InStoreOrderDetailsT } from '@/features/inStoreOrders/types';

type InvoiceProps = {
  order: OrderDetails | InStoreOrderDetailsT;
};

function Invoice({ order }: InvoiceProps) {
  const invoice = mapOrderToInvoice(order);

  return (
    <div className="w-full my-5 mx-auto">
      {/* PDF Preview */}
      <div className="w-full h-[500px] border rounded-md overflow-hidden">
        <PDFViewer width="100%" height="100%">
          <InvoiceDocument invoice={invoice} />
        </PDFViewer>
      </div>

      {/* Download Button */}
      <div className="mt-6 flex justify-center">
        <PDFDownloadLink
          document={<InvoiceDocument invoice={invoice} />}
          fileName={`${invoice.invoiceNumber}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading || !invoice}>
              {loading ? 'Generating Invoice...' : 'Download Invoice'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default Invoice;
