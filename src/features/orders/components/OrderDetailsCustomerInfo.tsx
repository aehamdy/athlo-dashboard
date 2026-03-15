import Heading from "@/components/shared/Heading";
import Icon from "@/components/shared/Icon";

type OrderDetailsCustomerInfoProps = {
  customerName: string;
  email: string;
  phone: string;
};

function OrderDetailsCustomerInfo({
  customerName,
  email,
  phone,
}: OrderDetailsCustomerInfoProps) {
  return (
    <div className="space-y-sm">
      <div className="flex items-center gap-sm pb-xs border-b">
        <Icon name="User" className="text-gray-400" />

        <Heading
          as="h3"
          className="font-semibold text-sm md:text-sm text-gray-400 uppercase tracking-widest"
        >
          Customer Details
        </Heading>
      </div>

      <div className="flex items-center gap-sm p-sm">
        <div className="p-tiny bg-accent/40 rounded-full">
          <Icon name="UserRound" size={26} className="text-accent" />
        </div>

        <div className="space-y-sm">
          <Heading as="h3" className="text-sm md:text-sm">
            {customerName
              .split(" ")
              .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())}
          </Heading>

          <div className="flex items-center gap-regular text-gray-500">
            <p className="">{phone}</p>

            <p className="">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsCustomerInfo;
