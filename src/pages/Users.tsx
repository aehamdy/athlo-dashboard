import DashboardSection from "@/components/sharedComponents/DashboardSection";
import List from "@/components/sharedComponents/List";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchPaginatedData from "@/hooks/useFetchPaginatedData";
import { API_ENDPOINTS } from "@/api/endPoints";
import { useState } from "react";
import Loading from "@/components/sharedComponents/Loading";
import Error from "@/components/sharedComponents/Error";

type User = {
  id?: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  birthDate: string;
  city: string;
  region: string;
  country: string;
  postalCode: string | number | null;
};

const usersTableCols = ["No.", "User", "Email", "Phone", "City", "Country"];

function Users() {
  const [page] = useState(1);
  const [pageSize] = useState(8);
  const { data, loading, error } = useFetchPaginatedData<User>(
    API_ENDPOINTS.users.paginated,
    page,
    pageSize,
  );

  if (error) return <Error title="Users" message={error} />;

  return (
    <DashboardSection
      title="Users"
      description="Manage and view all user accounts in the system."
    >
      <div className="space-y-tiny md:space-y-md lg:space-y-6xl">
        <List variant="table">
          <Table className="rounded-md overflow-hidden">
            <TableCaption>A list of all users in the system.</TableCaption>

            <TableHeader className="bg-neutral cursor-default">
              <TableRow className="text-center">
                {usersTableCols.map((col) => (
                  <TableHead
                    key={col}
                    className="text-center first:text-start last:text-end"
                  >
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {loading ? (
              <Loading
                variant="table"
                rowsCount={8}
                colsCount={usersTableCols.length}
              />
            ) : (
              data && (
                <TableBody>
                  {data?.items?.map((user, idx) => (
                    <TableRow key={user.email} className="h-[53px] text-center">
                      <TableCell className="w-4 text-start font-medium">
                        #{idx + 1}
                      </TableCell>

                      <TableCell className="font-medium">
                        {`${user.firstName} ${user.lastName}`}
                      </TableCell>

                      <TableCell>{user.email}</TableCell>

                      <TableCell>
                        {user.phoneNumber === null ? "N/A" : user.phoneNumber}
                      </TableCell>

                      <TableCell>
                        {user.city === null ? "N/A" : user.city}
                      </TableCell>

                      <TableCell>
                        {user.country === null ? "N/A" : user.country}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )
            )}
          </Table>
        </List>
      </div>
    </DashboardSection>
  );
}

export default Users;
