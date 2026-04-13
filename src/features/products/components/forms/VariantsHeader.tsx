import { VARIANTS_TABLE_HEAD } from '@/features/products/constants';

function VariantsHeader() {
  return (
    <div className="hidden md:grid grid-cols-8 gap-2 sm:gap-4 py-2 px-2 font-medium text-sm text-gray-500 bg-gray-200 border-t border-x border-gray-300 rounded-t-md">
      {VARIANTS_TABLE_HEAD.map((head) => {
        return (
          <div
            key={head.id}
            className={`px-2 text-center first:text-start last:text-end uppercase`}
          >
            {head.label}
          </div>
        );
      })}
    </div>
  );
}

export default VariantsHeader;
