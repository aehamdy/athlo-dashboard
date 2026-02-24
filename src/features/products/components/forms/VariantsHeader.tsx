const headers = [
  { id: 1, label: "Size" },
  { id: 2, label: "Color Name" },
  { id: 3, label: "Color Code" },
  { id: 4, label: "Price" },
  { id: 5, label: "Quantity" },
  { id: 6, label: "Actions" },
];

function VariantsHeader() {
  return (
    <div className="hidden md:grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-4 py-2 px-2 font-medium text-sm text-gray-500 bg-gray-200 border-t border-x border-gray-300 rounded-t-md">
      {headers.map((header) => {
        const colSpanMobile =
          header.label === "Actions" ? "col-span-2" : "col-span-1";

        const colSpanLg =
          header.label === "Size"
            ? "lg:col-span-2"
            : header.label === "Color Name"
              ? "lg:col-span-3"
              : header.label === "Actions"
                ? "lg:col-span-1"
                : "lg:col-span-2";

        return (
          <div
            key={header.id}
            className={`${colSpanMobile} ${colSpanLg} px-2 text-center first:text-start last:text-end uppercase`}
          >
            {header.label}
          </div>
        );
      })}
    </div>
  );
}

export default VariantsHeader;
