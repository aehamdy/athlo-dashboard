import Heading from "@/components/shared/Heading";
import type { OrderItem } from "../types";
import Icon from "@/components/shared/Icon";

type OrderDetailsProductsProps = {
    products: OrderItem[];
}

function OrderDetailsProducts({ products }: OrderDetailsProductsProps) {

    if (!products || products.length === 0)
        return <p>No products in this order.</p>;

    return (
        <div className="flex flex-col gap-sm">
            <div className="flex items-center gap-sm pb-xs border-b">
                <Icon name="Package" className="text-gray-400" />

                <Heading
                    as="h3"
                    className="font-semibold text-xs md:text-tiny text-gray-400 uppercase tracking-widest"
                >
                    Products
                </Heading>
            </div>

            <ul className="py-sm space-y-sm h-[330px] overflow-y-auto">
                {products.map((product) => (
                    <li
                        key={product.productVariantId + product.sku}
                        className="flex flex-col gap-sm p-compact bg-gray-50 hover:bg-gray-100 border rounded-md transition-colors duration-normal"
                    >
                        {/* Top Row: Name + SKU */}
                        <div className="flex justify-between items-center">
                            <Heading as="h3" className="font-semibold text-sm md:text-sm">{product.productName}</Heading>

                            <span className="text-xs text-gray-400">{product.sku}</span>
                        </div>

                        {/* Quantity & Unit Price */}
                        <div className="flex justify-between items-center text-xs">
                            <span>Quantity: {product.quantity}</span>

                            <span>Unit Price: &pound;{product.unitPrice.toLocaleString("en-GB")}</span>

                            <span className="font-medium">Total: &pound;{product.totalPrice.toLocaleString("en-GB")}</span>
                        </div>

                        {/* Attributes */}
                        {product.attributes && product.attributes.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-1 text-xs">
                                {product.attributes.map((attr, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded"
                                    >
                                        {/* If attribute has color */}
                                        {attr.type === "Color" && attr.colorHex && (
                                            <span
                                                className="w-4 h-4 rounded-full border border-gray-300"
                                                style={{ backgroundColor: attr.colorHex }}
                                            />
                                        )}
                                        <span className="text-xs">
                                            {attr.keyEn}: {attr.valueEn}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OrderDetailsProducts;