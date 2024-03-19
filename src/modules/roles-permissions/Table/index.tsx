import { GridSortModel } from "@mui/x-data-grid";
import * as R from "ramda";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { RECOIL_ASYNC_STATE, SORT_DIRECTION } from "@/common/constants";
import DataGridGeneric from "@/components/DataGridGeneric";
import { RowOptions } from "./columns";
import {
  paginationAtom,
  roleRowsAtom,
  rolesColumnsAtom,
  rolesQuery,
  totalWithRolesQuery,
} from "./store";

const RoleTable = () => {
  const rolesLoadable = useRecoilValueLoadable(rolesQuery);
  const rows = useRecoilValue(roleRowsAtom);
  const [columns, setColumns] = useRecoilState(rolesColumnsAtom);
  const total = useRecoilValue(totalWithRolesQuery);
  const [paginationModel, setPaginationModel] = useRecoilState(paginationAtom);
  const isLoading = rolesLoadable.state === RECOIL_ASYNC_STATE.LOADING;

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
    <DataGridGeneric
      moduleName="Roles"
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
  );
};
RoleTable.guestGuard = false;
export default RoleTable;
