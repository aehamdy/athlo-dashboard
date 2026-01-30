type TableWrapperProps = {
  children: React.ReactNode;
};

function TableWrapper({ children }: TableWrapperProps) {
  return (
    <section className="h-[78dvh] lg:h-[60vh] 2xl:h-[78vh] overflow-y-auto">
      {children}
    </section>
  );
}

export default TableWrapper;
