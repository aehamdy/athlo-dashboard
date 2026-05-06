import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useFetchInStoreOrder from '../hooks/useFetchInStoreOrder';
import Icon from '@/components/shared/Icon';
import { formatDateTime } from '@/utils/formatDateTime';
import InvoiceHeader from './InvoiceHeader';
import InvoiceTotals from './InvoiceTotals';
import InvoiceTable from './InvoiceTable';
import Loading from '@/components/shared/Loading';
import Error from '@/components/shared/Error';

interface Props {
  invoice: number | null;
  setInvoice: React.Dispatch<React.SetStateAction<number | null>>;
}

function InStoreOrderInvoice({ invoice, setInvoice }: Props) {
  const {
    data: order,
    isLoading,
    isError,
  } = useFetchInStoreOrder(invoice ?? 0);

  const { date } = order?.saleDate
    ? formatDateTime(order?.saleDate)
    : { date: '' };

  isLoading && <Loading />;

  isError && (
    <Error title="Order Invoice" message="Failed to fetch order invoice" />
  );

  return (
    <Dialog open={!!invoice} onOpenChange={(open) => !open && setInvoice(null)}>
      <DialogContent className="max-w-[410px] sm:max-w-[550px] p-0">
        <DialogHeader className="flex flex-col items-center p-compact md:p-base bg-accent/10 border-b">
          <DialogTitle className="flex flex-col items-center gap-base">
            <div className="w-content p-base bg-accent rounded-full">
              <Icon name="Check" className="" />
            </div>
            Order Success
          </DialogTitle>

          <DialogDescription>
            Your transaction has been completed successfully.
          </DialogDescription>
        </DialogHeader>

        <section className="p-compact md:p-base">
          <InvoiceHeader
            invoiceNumber={order?.saleNumber || ''}
            paymentMethod={order?.paymentMethod || ''}
            date={date}
            createdBy={order?.createdBy || ''}
          />

          <InvoiceTable itemsList={order?.items || []} />

          <InvoiceTotals finalAmount={order?.finalAmount || 0} />
        </section>

        <DialogFooter className="flex flex-row! justify-between! items-center p-compact md:p-base bg-accent/10 border-t">
          <Button variant="ghost" disabled>
            Download Invoice
          </Button>

          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InStoreOrderInvoice;
