type TableWrapperProps = {
  children: React.ReactNode;
};

function TableWrapper({ children }: TableWrapperProps) {
  return (
    <section className="h-[69dvh] md:h-[69dvh] lg:h-[60vh] xl:h-[55vh] overflow-y-auto">
      {children}
    </section>
  );
}

export default TableWrapper;
