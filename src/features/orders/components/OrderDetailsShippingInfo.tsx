import Heading from '@/components/shared/Heading';
import Icon from '@/components/shared/Icon';
import { Badge } from '@/components/ui/badge';

type OrderDetailsShippingInfoProps = {
    city: string;
    country: string;
    region: string;
    streetAddress: string;
    buildingNumber: string;
    floor: string;
    apartmentNumber: string;
    phoneNumber: string;
    method: string;
    shipmentStatus: string;
    trackingNumber: string;
    notes?: string;
};

function OrderDetailsShippingInfo({
    city,
    country,
    region,
    streetAddress,
    buildingNumber,
    floor,
    apartmentNumber,
    phoneNumber,
    method,
    shipmentStatus,
    notes,
}: OrderDetailsShippingInfoProps) {
    return (
        <div className="space-y-sm">
            <div className="flex items-center gap-sm pb-xs border-b">
                <Icon name="Truck" className="text-gray-400" />

                <Heading
                    as="h3"
                    className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
                >
                    Shipping Info
                </Heading>
            </div>

            <div className="grid grid-cols-2 gap-sm">
                <div className="flex flex-col gap-sm bg-gray-50 p-sm rounded-md">
                    <Heading
                        as="h5"
                        className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
                    >
                        Destination
                    </Heading>

                    <div className="flex flex-col gap-xs">
                        <p className="font-semibold text-xs text-gray-700">
                            {city}, {country}
                        </p>

                        <p className="font-semibold text-xs text-gray-700">
                            {region} Region
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-sm bg-gray-50 p-sm rounded-md">
                    <Heading
                        as="h5"
                        className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
                    >
                        Address Detail
                    </Heading>

                    <div className="flex flex-col gap-xs">
                        <p className="font-semibold text-xs text-gray-700">
                            {streetAddress}
                        </p>

                        <p className="font-semibold text-xs text-gray-700">
                            Building {buildingNumber}, Floor {floor}, Apt. {apartmentNumber}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-sm bg-gray-50 p-sm rounded-md">
                    <Heading
                        as="h5"
                        className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
                    >
                        Contact
                    </Heading>

                    <p className="font-semibold text-xs text-gray-700">{phoneNumber}</p>
                </div>

                <div className="flex flex-col gap-sm bg-gray-50 p-sm rounded-md">
                    <div className="flex justify-between items-center w-full">
                        <Heading
                            as="h5"
                            className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
                        >
                            Method
                        </Heading>

                        <div className="flex">
                            <Badge className="px-tiny py-0 rounded-md">
                                {shipmentStatus}
                            </Badge>
                        </div>
                    </div>

                    <p className="font-semibold text-xs text-gray-700">{method}</p>
                </div>

                {notes && (
                    <div className="col-span-2 flex flex-col gap-sm bg-gray-50 p-sm rounded-md">
                        <Heading
                            as="h5"
                            className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
                        >
                            Notes
                        </Heading>

                        <p className="font-semibold text-xs text-gray-700">{notes}</p>
                    </div>
                )}
            </div>

            {/* <div className="border-t">
                <div className="flex flex-col gap-sm p-compact rounded-md">
                    <Heading
                        as="h5"
                        className="font-semibold text-xs md:text-xs text-gray-400 uppercase tracking-widest"
                    >
                        Tracking Number
                    </Heading>

                    <p className="font-semibold text-xs text-accent-strong">
                        {trackingNumber}
                    </p>
                </div>
            </div> */}
        </div>
    );
}

export default OrderDetailsShippingInfo;
