type ListItemProps = {
  children: React.ReactNode;
};

function ListItem({ children }: ListItemProps) {
  return (
    <li className="lg:col-span-1 hover:shadow-lg overflow-hidden duration-normal rounded-lg">
      {children}
    </li>
  );
}

export default ListItem;
