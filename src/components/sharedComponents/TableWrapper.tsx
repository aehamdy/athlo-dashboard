type TableWrapperProps = {
  children: React.ReactNode;
};

function TableWrapper({ children }: TableWrapperProps) {
  return (
    <section className="h-[50dvh] min-h-[55dvh] max-h-[69dvh] md:h-[69dvh] lg:h-[55vh] xl:h-[52vh] overflow-y-auto">
      {children}
    </section>
  );
}

export default TableWrapper;
