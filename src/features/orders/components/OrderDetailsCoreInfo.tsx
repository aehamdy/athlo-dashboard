import Heading from "@/components/shared/Heading";
import Icon from "@/components/shared/Icon";
import { formatDateTime } from "@/utils/formatDateTime";

type OrderDetailsCoreInfoProps = {
  quantity: number;
  total: number;
  orderId: number | string;
  createdAt: string;
};

function OrderDetailsCoreInfo({
  createdAt,
  total,
  quantity,
  orderId,
}: OrderDetailsCoreInfoProps) {
  const { date: orderDate, time: orderTime } = formatDateTime(createdAt);
  const orderTotalAmount = total.toLocaleString("en-GB");

  return (
    <div className="space-y-sm">
      <div className="flex items-center gap-sm pb-xs border-b">
        <Icon name="Info" className="text-gray-400" />

        <Heading
          as="h3"
          className="font-semibold text-sm md:text-sm text-gray-400 uppercase tracking-widest"
        >
          Core Info
        </Heading>
      </div>

      <div className="grid grid-cols-2 gap-sm">
        <div className="flex flex-col gap-sm bg-gray-100 p-compact rounded-md">
          <Heading
            as="h5"
            className="font-semibold text-tiny md:text-[10px] text-gray-400 uppercase tracking-widest"
          >
            Order Quantity
          </Heading>

          <p className="font-semibold text-xs text-gray-700">{quantity}</p>
        </div>

        <div className="flex flex-col gap-sm bg-gray-100 p-compact rounded-md">
          <Heading
            as="h5"
            className="font-semibold text-tiny md:text-[10px] text-gray-400 uppercase tracking-widest"
          >
            Total Amount
          </Heading>

          <p className="font-semibold text-sm text-accent-strong">
            &pound; {orderTotalAmount}
          </p>
        </div>

        <div className="flex flex-col gap-sm bg-gray-100 p-compact rounded-md">
          <Heading
            as="h5"
            className="font-semibold text-tiny md:text-[10px] text-gray-400 uppercase tracking-widest"
          >
            Order No.
          </Heading>

          <p className="font-semibold text-xs text-gray-700">#{orderId}</p>
        </div>

        <div className="flex flex-col gap-sm bg-gray-100 p-compact rounded-md">
          <Heading
            as="h5"
            className="font-semibold text-tiny md:text-tiny text-gray-400 uppercase tracking-widest"
          >
            Creation Date
          </Heading>

          <p className="font-semibold text-xs text-gray-700">
            {orderDate} - {orderTime}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsCoreInfo;
