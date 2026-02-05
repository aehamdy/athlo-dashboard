type TableWrapperProps = {
  children: React.ReactNode;
};

function TableWrapper({ children }: TableWrapperProps) {
  return (
    <section className="h-[69dvh] md:h-[73dvh] lg:h-[55vh] xl:h-[52vh] overflow-y-auto">
      {children}
    </section>
  );
}

export default TableWrapper;
