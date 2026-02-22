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
    <div className="grid grid-cols-12 gap-4 py-sm px-xs font-medium text-sm text-gray-500 bg-gray-200 border-t border-x border-gray-300 rounded-t-md">
      {headers.map((header) => {
        const colSpan =
          header.label === "Size"
            ? "col-span-2"
            : header.label === "Color Name"
              ? "col-span-3"
              : header.label === "Actions"
                ? "col-span-1"
                : "col-span-2";
        return (
          <div
            key={header.id}
            className={`${colSpan} px-xs text-center first:text-start last:text-end uppercase`}
          >
            {header.label}
          </div>
        );
      })}
    </div>
  );
}

export default VariantsHeader;
