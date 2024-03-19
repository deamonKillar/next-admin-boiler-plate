import { GridSortModel } from "@mui/x-data-grid";
import * as R from "ramda";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { RECOIL_ASYNC_STATE, SORT_DIRECTION } from "@/common/constants";
import DataGridGeneric from "@/components/DataGridGeneric";
import { RowOptions } from "./columns";
import {
  paginationAtom,
  totalWithUsersQuery,
  userRowsAtom,
  usersColumnsAtom,
  usersQuery,
} from "./store";
import { Card } from "react-bootstrap";

const UserTable = () => {
  const usersLoadable = useRecoilValueLoadable(usersQuery);
  const rows = useRecoilValue(userRowsAtom);
  const [columns, setColumns] = useRecoilState(usersColumnsAtom);
  const total = useRecoilValue(totalWithUsersQuery);
  const [paginationModel, setPaginationModel] = useRecoilState(paginationAtom);
  const isLoading = usersLoadable.state === RECOIL_ASYNC_STATE.LOADING;

  const onSortModelChange = (sortModel: GridSortModel) => {
    const [sortedColumn] = sortModel;
    const newColumns = R.clone(columns);
    const [currentColumn] = R.filter(
      R.pathEq(sortedColumn.field, ["field"]),
      newColumns
    );

    newColumns.forEach((newColumn: any) => {
      if (newColumn === currentColumn) {
        currentColumn.isSorted = true;
        currentColumn.sortingOrder =
          currentColumn.sortingOrder?.[0] === SORT_DIRECTION.ASC
            ? [SORT_DIRECTION.DESC]
            : [SORT_DIRECTION.ASC];
      } else {
        newColumn.isSorted = false;
        newColumn.sortingOrder = [SORT_DIRECTION.DESC];
      }
    });

    setColumns(newColumns);
  };

  return (
    <>
      <Card className="box-content">
        <DataGridGeneric
          moduleName="Users"
          RowOptions={RowOptions}
          loading={isLoading}
          rows={rows}
          columns={columns}
          rowCount={total}
          disableRowSelectionOnClick
          onSortModelChange={onSortModelChange}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Card>
    </>
  );
};
UserTable.guestGuard = false;
export default UserTable;
