import DashboardSection from "@/components/shared/DashboardSection";
import List from "@/components/shared/List";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import useFetchPaginatedData from "@/hooks/useFetchPaginatedData";
import { API_ENDPOINTS } from "@/api/endPoints";
import { useState } from "react";
import Loading from "@/components/shared/Loading";
import Error from "@/components/shared/Error";
import TableHeadRow from "@/components/shared/TableHeadRow";
import TableWrapper from "@/components/shared/TableWrapper";
import { USER_TABLE_COLUMNS } from "@/config/tableColumns";
import { formatDateTime } from "@/utils/formatDateTime ";

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
          <TableWrapper>
            <Table className="rounded-md overflow-hidden">
              <TableCaption>A list of all users in the system.</TableCaption>

              <TableHeadRow tableCols={USER_TABLE_COLUMNS} />

              {loading ? (
                <Loading
                  variant="table"
                  rowsCount={8}
                  colsCount={USER_TABLE_COLUMNS.length}
                />
              ) : (
                data && (
                  <TableBody>
                    {data?.items?.map((user, idx) => {
                      const { date: birthDate } = formatDateTime(
                        user.birthDate,
                      );

                      return (
                        <TableRow
                          key={user.email}
                          className="h-[53px] text-center"
                        >
                          <TableCell className="w-4 text-start font-medium">
                            #{idx + 1}
                          </TableCell>

                          <TableCell className="font-medium">
                            {`${user.firstName} ${user.lastName}`}
                          </TableCell>

                          <TableCell>{user.email}</TableCell>

                          <TableCell className="font-medium text-cyan-600">
                            {birthDate}
                          </TableCell>

                          <TableCell>
                            {user.phoneNumber === null
                              ? "N/A"
                              : user.phoneNumber}
                          </TableCell>

                          <TableCell>
                            {user.city === null ? "N/A" : user.city}
                          </TableCell>

                          <TableCell className="text-end">
                            {user.country === null ? "N/A" : user.country}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )
              )}
            </Table>
          </TableWrapper>
        </List>
      </div>
    </DashboardSection>
  );
}

export default Users;
